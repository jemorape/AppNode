//logger.js
var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'myapp',
    stream: process.stdout,
    level: 'info'
});

log.info("This is 1st logging");
log.info("This is 2st logging");