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

// 1. Create a new entity - Create new keywords entity
let keywords_entity = {
    id: "mood_list",
    doc: "this is a mood list",
    lookups: ["keywords"] /* this is what make the entity to entity */
}

//2. Update the information of an entity
let values_keywords = {
    values: [
        { value: "sad", expressions: ["sad"] },
        { value: "happy", expressions: ["happy"] },
        { value: "lover", expressions: ["lover"]}
    ]
};

//3. Create new trait entity
let trait_entity = {
    id: "intent_mood",
    doc: "this is the expressions for moods",
    lookups: ["trait"], /* this is what make the entity to intent */
    values: [{value: "action.mood"}]
}

//4. Train your app - with samples
let samples = [{
    text: "my mood is sad",
    entities: [{
            entity: "intent_mood",
            value: "action.mode"
        },
        {
            entity: "mood_list",
            value: "sad",
            start: "10",
            end: "13"
        }
    ]},
{
    text: "today I dont feel nothing",
    entities: [{
            entity: "intent_mood",
            value: "action.mode"
        }
    ]},
{
    text: "I'm sad blue",
    entities: [{
            entity: "intent_mood",
            value: "action.mode"
        },
        {
            entity: "intent_mood",
            value: "sad",
            start: "4",
            end: "7"
        }]
}];

create_keywords_entity(keywords_entity, values_keywords);
create_trait_entity(trait_entity, samples);





function create_keywords_entity(messageData, values_keywords) {
    let options = {
        uri: "https://api.wit.ai/entities",
        method: "POST",
        headers: { "Authorization": "Bearer VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO", "Content-Type": "application/json" },
        json: messageData
    }
    request(options, function (err, response, body) {
        console.log("create_keywords_entity", body);
        //
        add_values_to_keywords_entity(messageData, values_keywords);
    });
}

function add_values_to_keywords_entity(entityData, messageData) {
    let options = {
        uri: "https://api.wit.ai/entities/" + entityData.id,
        method: "PUT",
        headers: { "Authorization": "Bearer VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO", "Content-Type": "application/json" },
        json: messageData
    }
    request(options, function (err, response, body) {
        console.log("add_values_to_keywords_entity", body);
    });
}

function create_trait_entity(messageData, samples) {
    let options = {
        uri: "https://api.wit.ai/entities",
        method: "POST",
        headers: { "Authorization": "Bearer VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO", "Content-Type": "application/json" },
        json: messageData
    }
    request(options, function (err, response, body) {
        console.log("create_trait_entity", body);
        add_samples_to_trait_entity(messageData, samples);
    });
}

function add_samples_to_trait_entity(entityData, messageData) {
    let options = {
        uri: "https://api.wit.ai/samples",
        method: "POST",
        headers: { "Authorization": "Bearer VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO", "Content-Type": "application/json" },
        json: messageData
    }
    request(options, function (err, response, body) {
        console.log("add_samples_to_trait_entity", body);
    });
}


// 4. Add samples to trait entity
// 5. App train with sample entity


/*
const client = new Wit({ accessToken: "VW4PUE4TSJPOCQF5ZVOI6CEQZXUGDEDO" });
client.message('what is the weather in London?', {})
    .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    })
    .catch(console.error);
*/
