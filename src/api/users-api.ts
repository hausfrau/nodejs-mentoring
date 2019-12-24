import {Request, Response, Router} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import uuidv1 from 'uuid/v1';

import {postAndPutUserSchema} from '../schemes/users-api';
import {getAutoSuggestUsers, getUser} from '../utils/users';
import {validateSchema} from '../utils/validation.js';
import {User, GetUsersSchema, GetUsersByIdSchema} from '../types/users-types';

export const router = Router();

let users: User[] = [
    {
        id: "5",
        login: "user5",
        password: "678",
        age: 19,
        isDeleted: false
    },
    {
        id: "1",
        login: "user1",
        password: "123",
        age: 21,
        isDeleted: false
    },
    {
        id: "2",
        login: "user2",
        password: "234",
        age: 20,
        isDeleted: false
    }];

router
    .get('/', (req: ValidatedRequest<GetUsersSchema>, res: Response) => {
        if (req.query.login) {
            const limit = parseInt(req.query.limit, 10) || 1;
            const {login} = req.query;

            res.json(getAutoSuggestUsers(users, login, limit));
        } else {
            res.send('Hello!');
        }
    })
    .post('/',  validateSchema(postAndPutUserSchema), (req: Request, res: Response) => {
        const {body} = req;
        const newUser = {
            ...body,
            id: uuidv1(),
            isDeleted: false
        };

        users.push(newUser);

        res.json(users);
    })
    .get('/:userId', (req: ValidatedRequest<GetUsersByIdSchema>, res: Response) => {
        const {params: {userId}} = req;

        res.json(getUser(users, userId));
    })
    .put('/:userId', validateSchema(postAndPutUserSchema), (req: Request, res: Response) => {
        const {params: {userId}} = req;
        const {body} = req;

        users = users.map((user: User) => user.id === userId ? {
            ...user,
            ...body
        } : user);

        console.log('put users=', users);
        res.json(getUser(users, userId));
    })
    .delete('/:userId', (req: ValidatedRequest<GetUsersByIdSchema>, res: Response) => {
        const {params: {userId}} = req;

        users = users.map((user) => user.id === userId ? {
            ...user,
            isDeleted: true
        } : user);

        res.json(users);
    });
//