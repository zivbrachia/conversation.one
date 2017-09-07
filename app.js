'use strict'

let express = require("express");
let app = express();
let env = require('./lib/environment');

let port = require('./lib/config').port;

require('./lib/config')(app);

require('./lib/routes')(app);

app.listen(port);

console.log('Your application is running on http://localhost:' + port + ", Process id: " + process.pid);