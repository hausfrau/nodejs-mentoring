import {Request, Response, Router} from 'express';
import uuidv1 from 'uuid/v1';

import {getAutoSuggestUsers, getUser} from '../utils/users';
import {User} from '../types/users-types';

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

router.route('/')
    .get((req: Request, res: Response) => {
        if (req.query.login) {
            const limit = parseInt(req.query.limit, 10) || 1;
            const {login} = req.query;

            res.json(getAutoSuggestUsers(users, login, limit));
        } else {
            res.send('Hello!');
        }
    });

router.route('/users')
    .get((_req: Request, res: Response) => {
            res.json(users)
        }
    )
    .post((req: Request, res: Response) => {
        const {body} = req;
        const newUser = {
            ...body,
            id: uuidv1(),
            isDeleted: false
        };

        users.push(newUser);

        res.json(users);
    });

router.route('/user/:userId')
    .get((req: Request, res: Response) => {
        const {params: {userId}} = req;

        res.json(getUser(users, userId)) ;
    })
    .put((req: Request, res: Response) => {
        const {body} = req;

        users = users.map((user: User) => user.id === body.id ? body : user);

        res.json(getUser(users, body.id));
    })
    .delete((req: Request, res: Response) => {
        const {params: {userId}} = req;

        users = users.map((user: User) => user.id === userId ? ({
                ...user,
                isDeleted: true
            }) : user
        );

        res.json(users);
    });