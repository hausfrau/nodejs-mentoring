import express, { json } from 'express';
import cors from 'cors';

import { loginRouter } from './routers/login';
import { usersRouter } from './routers/users';
import { groupsRouter } from './routers/groups';
import { winstonLogger } from './middlewares/winston-logger';
import { errorHandler } from './middlewares/error-handler';

import db from './database';

export const app = express();

const { PORT = 3000 } = process.env;

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

            app.listen(PORT, () => {
                console.log(`Server started at http://localhost:${PORT}`);
            });

            process.on('uncaughtException', (event) => {
                winstonLogger.error('InternalServerError: uncaughtException', event);
            });

            process.on('unhandledRejection', (event) => {
                winstonLogger.error('InternalServerError: unhandledRejection', event);
            });
        }
    );
