import {
    Response,
    Router
} from 'express';

import {ValidatedRequest} from 'express-joi-validation';

import uuidv1 from 'uuid/v1';

import {
    postAndPutUserSchema,
    getUsersSchema,
    getUserByIdSchema,
    putUserParamsSchema,
    deleteUserSchema
} from '../schemes/users-api';

import {
    getAutoSuggestUsers,
    getUser
} from '../utils/users';

import {
    validateBodySchema,
    validateQuerySchema,
    validateParamsSchema
} from '../utils/validation.js';

import {
    User,
    GetUsersSchema,
    GetUsersByIdSchema,
    PostUserSchema,
    PutUserSchema,
    DeleteUserSchema
} from '../types/users-types';

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
    .get(
        '/',
        validateQuerySchema(getUsersSchema),
        (req: ValidatedRequest<GetUsersSchema>, res: Response) => {
            if (req.query.login) {
                const limit = parseInt(req.query.limit, 10) || 1;
                const {login} = req.query;

                res.json(getAutoSuggestUsers(users, login, limit));
            }

            res.json(users);
        })
    .post(
        '/',
        validateBodySchema(postAndPutUserSchema),
        (req: ValidatedRequest<PostUserSchema>, res: Response) => {
            const {body} = req;
            const newUser = {
                ...body,
                id: uuidv1(),
                isDeleted: false
            };

            users.push(newUser);

            res.json(users);
        })
    .get(
        '/:userId',
        validateParamsSchema(getUserByIdSchema),
        (req: ValidatedRequest<GetUsersByIdSchema>, res: Response) => {
            const {params: {userId}} = req;

            res.json(getUser(users, userId));
        })
    .put('/:userId',
        validateBodySchema(postAndPutUserSchema),
        validateParamsSchema(putUserParamsSchema),
        (req: ValidatedRequest<PutUserSchema>, res: Response) => {
            const {params: {userId}} = req;
            const {body} = req;

            users = users.map((user: User) => user.id === userId ? {
                ...user,
                ...body
            } : user);

            res.json(getUser(users, userId));
        })
    .delete(
        '/:userId',
        validateParamsSchema(deleteUserSchema),
        (req: ValidatedRequest<DeleteUserSchema>, res: Response) => {
            const {params: {userId}} = req;

            users = users.map((user) => user.id === userId ? {
                ...user,
                isDeleted: true
            } : user);

            res.json(users);
        });
