'use strict';

const bunyan = require('bunyan');
const config = require('../config');

const logger = bunyan.createLogger({
    name: config.get('log.name'),
    streams: [
        { level: config.get('log.level'), stream: process.stdout },
        { level: config.get('log.level'), path: `${config.get('log.dir')}${config.get('log.name')}.log` }
    ],
    serializers: bunyan.stdSerializers
});

const auditLogger = bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
});

module.exports = { logger, auditLogger };
