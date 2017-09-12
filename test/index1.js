'use strict'
var express = require('express')
var app = express()
var bodyParser  = require('body-parser');
var request = require('request');
const {Wit, log} = require('node-wit');
const intentUtteranceExpander = require('intent-utterance-expander');
var log4js = require('log4js');

log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  });
var logger = log4js.getLogger('cheese');

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

const client = new Wit(
    {
        accessToken: process.env.WIT_SERVER_ACCESS_TOKEN,
        logger: new log.Logger(log.DEBUG)
    }
);

//Objects///////////////////////////////////////////////////////////////
class Entity {
    constructor(id, doc, lookup) {
        this.id = id;
        this.doc = doc;
        this.lookups = [lookup];
    }

    add_value(value) {
        this.values = this.values || [];
        this.values.push(value);
    }

    build_samples(value, type) {
        let samples = [];
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].expressions.length; j++) {
                let sample = new Sample(this.values[i].expressions[j], this.id, this.values[i].value);
                sample.set_parameter(value, type);
                samples.push(sample);
            }
            return samples;
        }
    }
};

class Value {
    constructor(value) {
        this.value = value;
        this.expressions = [];
    }

    add_expression(expression) {
        this.expressions.push(expression);
        return this;
    }

    set_expressions(expressions) {
        this.expressions = expressions;
    }
}

class Sample {
    constructor(user_says, intent, action) {
        this.text = user_says;
        this.entities = [
            {
                entity: intent,
                value: action
            }
        ];

    }

    set_parameter(value, entity) {
        if (this.text.includes(value)) {
            let entity_tmp = {
                entity: entity,
                value: value,
            }
            entity_tmp.start = this.text.indexOf(value);
            entity_tmp.end = entity_tmp.start + (value.length - 1);
            this.entities.push(entity_tmp);
        }
    }
}
//Objects///////////////////////////////////////////////////////////////
//Wit.ai API///////////////////////////////////////////////////////////////
function create_entity_promise(messageData) {
    let entity_rq = new Promise(function (resolve, reject) {
        let options = {
            uri: "https://api.wit.ai/entities",
            method: "POST",
            headers: { "Authorization": "Bearer " + process.env.WIT_SERVER_ACCESS_TOKEN, "Content-Type": "application/json" },
            json: messageData
        }
        request(options, function (err, response, body) {
            if (err) {
                reject(err);
            }
            else {
                resolve(body);
            }
            console.log("create_keywords_entity", body);
        });
    });
    return entity_rq;
}

function train_samples(messageData) {
    let options = {
        uri: "https://api.wit.ai/samples",
        method: "POST",
        headers: { "Authorization": "Bearer " + process.env.WIT_SERVER_ACCESS_TOKEN, "Content-Type": "application/json" },
        json: messageData
    }
    request(options, function (err, response, body) {
        console.log("train_samples", body);
    });
}
//Wit.ai API///////////////////////////////////////////////////////////////
//Wit.ai engine///////////////////////////////////////////////////////////////
var samples = require("./zuznow_nlu.js");
let samples_wit = [];
let types = {
    "PINCode": "wit$number",
    "Number": "wit$number",
    "Amount": "wit$number",
    "Date": "wit$datetime",
    "DateBegin": "wit$datetime",
    "DateEnd": "wit$datetime",
    "PayeeName": "wit$number", // TODO
    "Symbol": "wit$number",  // TODO
    "Category": "wit$number", // TODO "CON1.List_Of_Categories"
    "From": "wit$number", // TODO "CON1.Currencies"
    "To": "wit$number", // TODO "CON1.Currencies"
    "State": "wit$number", // TODO "CON1.US_STATE"
    "City": "wit$number", // TODO "CON1.CITY"
    "Street": "wit$number", // TODO "CON1.PostalAddress"
};

let entities_array = [];
for (let i = 0; i < samples.interactions.entities.length; i++) {
    let entity_name = samples.interactions.entities[i].name.toLowerCase();
    let entity = new Entity(entity_name, entity_name + " doc", "keywords");
    for (let j = 0; j < samples.interactions.entities[i].values.length; j++) {
        let expression = samples.interactions.entities[i].values[j]
        entity.add_value(new Value(expression).add_expression(expression));
    }
    entities_array.push(entity);
}

for (let i = 0; i < samples.interactions.intents.length; i++) {
    let entity_name = samples.interactions.intents[i].name.toLowerCase();
    let entity = new Entity(entity_name, entity_name + " doc", "trait");
    let user_says = intentUtteranceExpander(samples.interactions.intents[i].samples);
    let value = new Value(entity_name);
    for (let j = 0; j < user_says.length; j++) {
        for (let k = 0; k < user_says[j].length; k++) {
            let text = user_says[j][k];
            value.add_expression(text);
        }
    }
    entity.add_value(value);
    entities_array.push(entity);
    
    // build samples with parameters
    if (samples.interactions.intents[i].entities) {
        for (let j = 0; j < samples.interactions.intents[i].entities.length; j++) {
            let type = types[samples.interactions.intents[i].entities[j].name] || samples.interactions.intents[i].entities[j].type.toLowerCase();
            if (type==="con1.postaladdress") {
                console.log(samples.interactions.intents[i].entities[j].name);
            }
            let arr = entity.build_samples("{" + samples.interactions.intents[i].entities[j].name + "}", type);
            for (let k = 0; k < arr.length; k++) {
                samples_wit.push(arr[k]);
            }
        }
    }
}

let entities_array_promise =[];
for (let i = 0; i < entities_array.length; i++) {
    entities_array_promise.push(create_entity_promise(entities_array[i]));
}

/*create_entity_promise(entities_array[14])
    .then(function (value) {
        train_samples(entities_array[14].build_samples("{PINCode}", "wit$number"))
    }).catch(function (err) {

    });
*/
Promise.all(entities_array_promise)
    .then(function (values) {
        console.log("Promise All Values", values);
        train_samples(samples_wit);
    }).catch(function (err) {
        console.log("Promise All Err", err);
    });
//Wit.ai engine///////////////////////////////////////////////////////////////

app.get('/webhook', function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }  
});

app.post('/webhook', function (req, res) {
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object === 'page') {
        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            // Iterate over each messaging event
            entry.messaging.forEach(function (event) {
                if (event.message) {
                    receivedMessage(event);
                } else if (event.postback) {
                    receivedPostback(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        res.sendStatus(200);
    }
});

function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback 
    // button for Structured Messages. 
    var payload = event.postback.payload;

    console.log("Received postback for user %d and page %d with payload '%s' at %d", senderID, recipientID, payload, timeOfPostback);

    // When a postback is called, we'll send a message back to the sender to 
    // let them know it was successful
    sendTextMessage(senderID, "Postback called");
}

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {

        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (messageText) {
            case 'generic':
                sendGenericMessage(senderID);
                break;

            default:
                sendTextMessage(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}

function sendGenericMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "rift",
                        subtitle: "Next-generation virtual reality",
                        item_url: "https://www.oculus.com/en-us/rift/",
                        image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.oculus.com/en-us/rift/",
                            title: "Open Web URL"
                        }, {
                            type: "postback",
                            title: "Call Postback",
                            payload: "Payload for first bubble",
                        }],
                    }, {
                        title: "touch",
                        subtitle: "Your Hands, Now in VR",
                        item_url: "https://www.oculus.com/en-us/touch/",
                        image_url: "http://messengerdemo.parseapp.com/img/touch.png",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.oculus.com/en-us/touch/",
                            title: "Open Web URL"
                        }, {
                            type: "postback",
                            title: "Call Postback",
                            payload: "Payload for second bubble",
                        }]
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}

function sendTextMessage(recipientId, messageText) {
    client.message(messageText, {})
    .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: "your balance is "
            }
        };

        callSendAPI(messageData);
    })
    .catch(
        console.error
    );
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.FB_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}

var port = 9898;
app.listen(port)

console.log('Your application is running on http://localhost:' + port);
