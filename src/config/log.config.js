module.exports = ({appName, nodeEnv, rootPath}) => {
    return {
        name: {
            doc: 'The log file name.',
            format: String,
            default: `${appName}-${nodeEnv}`,
            env: 'LOG_NAME'
        },
        level: {
            doc: 'The log level',
            format: String,
            default: 'info',
            env: 'LOG_LEVEL'
        },
        dir: {
            doc: 'Log files directory',
            format: String,
            default: `${rootPath}/logs`
        }
    };
};
