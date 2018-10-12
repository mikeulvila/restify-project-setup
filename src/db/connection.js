'use strict';

const config = require('../config');
const mysql = require('mysql2/promise');
const {logger} = require('../utils/logger');

let poolsConfig = {
    master: {
        database: config.get('db.master.name'),
        host: config.get('db.master.host'),
        user: config.get('db.master.user'),
        password: config.get('db.master.password'),
        connectionLimit: config.get('db.master.connectionLimit')
    },
    slave: {
        database: config.get('db.slave.name'),
        host: config.get('db.slave.host'),
        user: config.get('db.slave.user'),
        password: config.get('db.slave.password'),
        connectionLimit: config.get('db.slave.connectionLimit')
    },
    api: {
        database: config.get('db.api.name'),
        host: config.get('db.api.host'),
        user: config.get('db.api.user'),
        password: config.get('db.api.password'),
        connectionLimit: config.get('db.api.connectionLimit')
    }
};

const pools = {};

module.exports.init = () => {
    // create pools and add event listeners
    Object.keys(poolsConfig).forEach(async name => {
        try {
            pools[name] = await mysql.createPool(poolsConfig[name]);

            pools[name].on('acquire', connection => {
                logger.info(`Connection ${connection.threadId} acquired`);
            });

            pools[name].on('release', connection => {
                logger.info(`Connection ${connection.threadId} released`);
            });
        } catch (e) {
            logger.error('Create db pool error', e);
        }
    });

    logger.info('db connection pools created!');
};

// get a connection from the pool of the specified db name
module.exports.getConnection = async name => {
    if (!pools[name]) throw `No pools for ${name} connected.`;

    try {
        return pools[name].getConnection();
    } catch (e) {
        logger.error('getConnection() error', e);
    }
};
