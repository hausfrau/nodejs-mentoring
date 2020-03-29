import express, { json } from 'express';
import cors from 'cors';

import { loginRouter } from './routers/login';
import { usersRouter } from './routers/users';
import { groupsRouter } from './routers/groups';
import { winstonLogger } from './middlewares/winston-logger';
import { errorHandler } from './middlewares/error-handler';

import db from './database';

const app = express();

db
    .sync()
    .then(
        () => {
            app.use(json());
            app.use(cors());
            app.use('/api/login', loginRouter);
            app.use('/api/users', usersRouter);
            app.use('/api/groups', groupsRouter);

            app.use(errorHandler);

            process.on('uncaughtException', (event) => {
                winstonLogger.error('InternalServerError: uncaughtException', event);
            });

            process.on('unhandledRejection', (event) => {
                winstonLogger.error('InternalServerError: unhandledRejection', event);
            });
        }
    );

export default app;
