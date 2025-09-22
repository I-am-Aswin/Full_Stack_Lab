import winston from "winston";

const logger = winston.createLogger( {
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console( { format: winston.format.prettyPrint() } ),
        new winston.transports.File( { filename: 'logs/info.log', level: 'info' } ),
        new winston.transports.File( { filename: 'logs/debug.log', level: 'debug' } ),
        new winston.transports.File( { filename: 'logs/app.log' } )
    ]
});

export default logger;