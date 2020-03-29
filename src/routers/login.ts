import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from '../constants';
import UsersService from '../services/users';
import User from '../models/user';

export const loginRouter = Router();
const usersService = new UsersService(User);

loginRouter
    .post('/', async (req, res, next) => {
        try {
            const { login, password } = req.body;
            const user = await usersService.getUserByLoginAndPassword(login, password);

            if (!user) {
                res.status(403).end('Incorrect login or password');
            }

            const payload = {
                id: user.id
            };
            const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: 3000 });

            res.send(token);
        } catch (err) {
            next(err);
        }
    });
