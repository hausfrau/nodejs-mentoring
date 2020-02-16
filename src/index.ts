import express, {json} from 'express';

import {router} from './routers/users';
import db from './database';

export const app = express();

const {PORT = 3000} = process.env;

app.use(json());
app.use('/api/users', router);

db
    .sync()
    .then(
        () => {
            app.listen(PORT, () => {
                console.log(`Server started at http://localhost:${PORT}`);
            });
        }
    );
