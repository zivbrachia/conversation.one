'use strict'

let express = require("express");
let app = express();
let env = require('./lib/environment');

let port = require('./lib/config').port;

require('./lib/config')(app);

require('./lib/routes')(app);

app.listen(port);

console.log('Your application is running on http://localhost:' + port + ", Process id: " + process.pid);

//wit.ai///////////////////////////////////
const { Wit, log } = require('node-wit');
let request = require('request');

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

let entityObj = new Entity("mood_list", "this is a mood list", "keywords");

entityObj.add_value(new Value("sad").add_expression("sad"));
entityObj.add_value(new Value("happy").add_expression("happy"));
entityObj.add_value(new Value("lover").add_expression("lover"));

let entityObj1 = new Entity("intent_mood", "this is a expressions for moods", "trait");

let value = new Value("action.mode");
value.add_expression("my name is sad");
value.add_expression("sad is my name");
value.add_expression("today I feel ok");

entityObj1.add_value(value);

let sample1 = entityObj1.build_samples("sad", "mood_list");

/*
let entities = [
    { // entity - list type
        "id": "mood_list",
        "doc": "this is a mood list",
        "lookups": ["keywords"], 
        "values": [
            { "value": "sad", "expressions": ["sad"] },
            { "value": "happy", "expressions": ["happy"] },
            { "value": "lover", "expressions": ["lover"] }
        ]
    },
    { // entity - intent type
        "id": "intent_mood",
        "doc": "this is the expressions for moods",
        "lookups": ["trait"],
        "values": [
            { "value": "action.mood", "expressions": ["my name is sad", "sad is my name", "today I feel ok"] }
        ]
    }
];

let list = ["sad", "happy", "lover"];
let entity1 = build_entity("mood_list", "this is a mood list", ["keywords"], []);
for (let i = 0; i < list.length; i++) {
    let keyword = {};
    keyword.value = list[i];
    keyword.expressions = [list[i]];
    entity1.values.push(keyword);
}
//entity1.values.push({ "value": "sad", "expressions": ["sad"] });
//entity1.values.push({ "value": "happy", "expressions": ["happy"] });
//entity1.values.push({ "value": "lover", "expressions": ["lover"] });
let list2 = ["my name is sad", "sad is my name", "today I feel ok"];
let entity2 = build_entity("intent_mood", "this is the expressions for moods", ["trait"], []);
let trait = {};
trait.value = "action.mode";
trait.expressions = [];
for (let i = 0; i < list2.length; i++) {
    trait.expressions.push(list2[i]);
}
entity2.values.push(trait);
*/
//entity2.values.push({ "value": "action.mood", "expressions": ["my name is sad", "sad is my name", "today I feel ok"] });
/*
let samples = [
    {
        text: "my name is sad",
        entities: [
            {
                entity: "intent_mood",
                value: "action.mode"
            },
            {
                entity: "mood_list",
                value: "sad",
                start: 11,
                end: 13
            }
        ]
    },
    {
        text: "sad is my name",
        entities: [
            {
                entity: "intent_mood",
                value: "action.mode"
            },
            {
                entity: "intent_mood",
                value: "action.mode",
                start: 0,
                end: 2
            }
        ]
    },
    {
        text: "today I feel ok",
        entities: [
            {
                entity: "intent_mood",
                value: "action.mode"
            }
        ]
    }
];
*/
Promise.all([
    create_entity_promise(entityObj),
    create_entity_promise(entityObj1)
]).then(function (values) {
    console.log("Promise All Values", values);
    train_samples(sample1);    
}).catch(function (err) {
    console.log("Promise All Err", err);
});
// 1. Create a new entity
// 2. Train your app - with samples

function create_entity_promise(messageData) {
    let entity_rq = new Promise(function (resolve, reject) {
        let options = {
            uri: "https://api.wit.ai/entities",
            method: "POST",
            headers: { "Authorization": "Bearer VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO", "Content-Type": "application/json" },
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
        headers: { "Authorization": "Bearer VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO", "Content-Type": "application/json" },
        json: messageData
    }
    request(options, function (err, response, body) {
        console.log("train_samples", body);
    });
}
/*
const client = new Wit({ accessToken: "VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO" });
client.message('lover is my name', {})
    .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    })
    .catch(console.error);
*/