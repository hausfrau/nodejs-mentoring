import {
    createLogger,
    format,
    transports
} from 'winston';

export const winstonLogger = createLogger({
    format: format.combine(
        format.prettyPrint(),
        format.timestamp(),
        format.colorize()
    ),
    transports: [
        new transports.Console({
            level: 'info'
        }),

        new transports.Console({
            level: 'error'
        }),

        new transports.File({
            level: 'info',
            filename: 'info.log'
        }),

        new transports.File({
            level: 'error',
            filename: 'errors.log'
        })
    ]
});
