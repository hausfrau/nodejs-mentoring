import express, { json } from 'express';

import { usersRouter } from './routers/users';
import { groupsRouter } from './routers/groups';
import db from './database';

export const app = express();

const { PORT = 3000 } = process.env;

app.use(json());
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);

db
    .sync()
    .then(
        () => {
            app.listen(PORT, () => {
                console.log(`Server started at http://localhost:${PORT}`);
            });
        }
    );
