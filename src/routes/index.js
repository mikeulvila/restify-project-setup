'use strict';

module.exports = server => {
    require('./areas')(server);
    require('./users')(server);
};
