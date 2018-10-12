module.exports = () => {
    return {
        master: {
            name: {
                doc: 'Database name',
                format: String,
                default: 'quorehotel',
                env: 'DB_MASTER_NAME'
            },
            host: {
                doc: 'Database host',
                format: String,
                default: 'slydell',
                env: 'DB_MASTER_HOST'
            },
            user: {
                doc: 'Database user',
                format: String,
                default: '',
                env: 'DB_MASTER_USER'
            },
            password: {
                doc: 'Database password',
                format: String,
                default: '',
                env: 'DB_MASTER_PASSWORD'
            },
            connectionLimit: {
                doc: 'The maximum number of connections to create at once.',
                format: 'int',
                default: 10,
                env: 'DB_MASTER_CONNECTION_LIMIT'
            }
        },
        slave: {
            name: {
                doc: 'Database name',
                format: String,
                default: 'quorehotel',
                env: 'DB_SLAVE_NAME'
            },
            host: {
                doc: 'Database host',
                format: String,
                default: 'porter',
                env: 'DB_SLAVE_HOST'
            },
            user: {
                doc: 'Database user',
                format: String,
                default: '',
                env: 'DB_SLAVE_USER'
            },
            password: {
                doc: 'Database password',
                format: String,
                default: '',
                env: 'DB_SLAVE_PASSWORD'
            },
            connectionLimit: {
                doc: 'The maximum number of connections to create at once.',
                format: 'int',
                default: 10,
                env: 'DB_MASTER_CONNECTION_LIMIT'
            }
        },
        api: {
            name: {
                doc: 'Database name',
                format: String,
                default: 'quoreapi',
                env: 'DB_API_NAME'
            },
            host: {
                doc: 'Database host',
                format: '*',
                default: 'slydell',
                env: 'DB_API_HOST'
            },
            user: {
                doc: 'Database user',
                format: String,
                default: '',
                env: 'DB_API_USER'
            },
            password: {
                doc: 'Database password',
                format: String,
                default: '',
                env: 'DB_API_PASSWORD'
            },
            connectionLimit: {
                doc: 'The maximum number of connections to create at once.',
                format: 'int',
                default: 10,
                env: 'DB_MASTER_CONNECTION_LIMIT'
            }
        }
    };
};
