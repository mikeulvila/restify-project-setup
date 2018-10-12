'use strict';

const db = require('../db/connection');

// require basic create update delete queries
const logRequest = (req, res, next) => {
    console.info(`${req.method} - ${req.url}`);
    res.send('ok');
    return next();
};

const respond = async (req, res, next) => {
    try {
        const result = await db.master.execute('SELECT * FROM user WHERE id = ?', [req.params.id]);

        res.send(result);
        return next();
    } catch (e) {
        next(e);
    }
};

module.exports = server => {
    server.get('/users', logRequest);
    server.get('/users/:id', respond);
    server.post('/users', logRequest);
    server.put('/users/:id', logRequest);
    server.del('/users/:id', logRequest);
};
