'use strict'

let express = require("express");
let app = express();
let env = require('./lib/environment');

let port = require('./lib/config').port;

require('./lib/config')(app);

app.listen(port);

console.log('Your application is running on http://localhost:' + port);