'use strict';

const db = require('../db/connection');

const logRequest = (req, res, next) => {
    res.send(200, { hello: 'world'});
    return next();
};

const respond = async(req, res, next) => {
    try {
        const result = await db.master.execute('SELECT * FROM user WHERE id = ?', [req.params.id]);

        res.send(result);
        return next();
    } catch (e) {
        next(e);
    }
};

module.exports = server => {
    server.get('/areas', logRequest);
    server.get('/areas/:id', respond);
    server.post('/areas', logRequest);
    server.put('/areas/:id', logRequest);
    server.del('/areas/:id', logRequest);
};
