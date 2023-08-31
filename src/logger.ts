import {createLogger, format, transports} from 'winston';
const {combine, timestamp, prettyPrint, splat, printf} = format;

/**
 * This code configures the format of log entries that will
 * be emitted by the Winston logger
 */

const myFormat = printf(info => {
    // This will customize the Error Message
    if(info instanceof Error) {
        return `${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info.level}: ${info.message}`;
});

export const logger = createLogger({
    level: 'info',
    handleExceptions: true,
    format: combine(timestamp(), prettyPrint(), splat(), myFormat),
    transports: [new transports.Console()],
    exitOnError: false,
})

