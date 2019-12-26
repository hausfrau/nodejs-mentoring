import express, {json} from 'express';

import { router } from './api/users-api';

export const app = express();

const {PORT = 3000} = process.env;

app.use(json());
app.use('/api/users', router);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
