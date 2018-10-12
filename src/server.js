'use strict';

require('dotenv').config();

const restify = require('restify');
const config = require('./config');
const { logger, auditLogger } = require('./utils/logger');
const routes = require('./routes');
const errors = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');
const auth = require('./middlewares/auth');
const cors = corsMiddleware({
	origins: ['http://localhost:4200'],
	allowHeaders: ['X-APP-VERSION'],
	exposeHeaders: []
});

const db = require('./db/connection');

db.init();

const server = restify.createServer({
    name: 'qv4Api',
    log: logger
});

// server.pre is executed before routing
server.pre(cors.preflight);

// server.use is executed after a route has been chosen to service the request.
server.use(cors.actual);

// plugins
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.requestLogger({
    headers: ['x-auth']
}));

server.on('after', restify.plugins.auditLogger({
    log: auditLogger,
    event: 'after',
    printLog: true
}));

server.get('/cluster', async(req, res, next) => {
    try {
        const connection = await db.getConnection('master');
        const [result, fields] = await connection.execute('SELECT * FROM user WHERE id = 635161');

        res.send(result);
        connection.release();
        return next();
    } catch (e) {
        return next(e);
    }

});

// register routes
routes(server);

server.listen(config.get('port'), () => {
    server.log.info(`api is running on port: ${config.get('port')}`);

    // just to show that we have registered our routes
    const routes = server.router.getRoutes();
    const routeKeys = Object.keys(routes);

    console.log('available routes:');
    routeKeys.forEach(routeKey => {
        const route = routes[routeKey];
        console.log(`${route.method}: ${route.spec.path}`);
    });
});
