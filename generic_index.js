'use strict'

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var log4js = require('log4js');

log4js.configure({
    appenders: { appender1: { type: 'file', filename: 'logger.log' }, appender2: { type: 'console' } },
    categories: { default: { appenders: ['appender1', 'appender2'], level: 'debug' } }
});
var logger = log4js.getLogger();

logger.debug('----> Start index.js');

/*logger.trace('trace msg.');
logger.debug('debug msg.');
logger.info('info msg.');
logger.warn('warn msg.');
logger.error('error msg');
logger.fatal('fatal msg');*/

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World')
});

let port = 9898;
app.listen(port)
logger.debug('Your application is running on http://localhost:', port);