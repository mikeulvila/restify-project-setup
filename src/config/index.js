'use strict';

const path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';
const appName = 'qv4api';
const rootPath = path.normalize(`${__dirname}/../..`);
const convict = require('convict');
const dbConfig = require('./db.config');
const logConfig = require('./log.config');

// Define a schema
let config = convict({
    root: {
        doc: 'The application root path.',
        format: String,
        default: rootPath,
        env: 'ROOT'
    },
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	ip: {
		doc: 'The IP address to bind.',
		format: 'ipaddress',
		default: '127.0.0.1',
		env: 'IP_ADDRESS',
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 3000,
		env: 'PORT',
		arg: 'port'
	},
    db: dbConfig(),
    log: logConfig({appName, nodeEnv, rootPath})
});

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;
