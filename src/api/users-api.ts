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
import UserModel from '../models/user';
import {
    validateBodySchema,
    validateQuerySchema,
    validateParamsSchema
} from '../utils/validation.js';
import {
    GetUsersSchema,
    GetUsersByIdSchema,
    PostUserSchema,
    PutUserSchema,
    DeleteUserSchema
} from '../types/users-types';

export const router = Router();

router
    .get(
        '/',
        validateQuerySchema(getUsersSchema),
        (req: ValidatedRequest<GetUsersSchema>, res: Response) => {
            if (req.query.login) {
                const limit = parseInt(req.query.limit, 10) || 1;
                const {login} = req.query;

                UserModel
                    .findAll({
                        where: {
                            login: login
                        },
                        limit: limit
                    })
                    .then((users => res.json(users)))
            }
        })
    .post(
        '/',
        validateBodySchema(postAndPutUserSchema),
        (req: ValidatedRequest<PostUserSchema>, res: Response) => {
            const {body} = req;

            UserModel
                .create({
                    ...body,
                    id: uuidv1(),
                    isDeleted: false
                })
                .then((user) => res.json(user));
        })
    .get(
        '/:userId',
        validateParamsSchema(getUserByIdSchema),
        (req: ValidatedRequest<GetUsersByIdSchema>, res: Response) => {
            const {params: {userId}} = req;

            UserModel
                .findByPk(userId)
                .then((user) => res.json(user));
        })
    .put('/:userId',
        validateBodySchema(postAndPutUserSchema),
        validateParamsSchema(putUserParamsSchema),
        (req: ValidatedRequest<PutUserSchema>, res: Response) => {
            const {params: {userId}} = req;
            const {body} = req;

            UserModel
                .update({
                        ...body
                    },
                    {
                        where: {
                            id: userId
                        }
                    })
                .then(() => res.json(userId))
        })
    .delete(
        '/:userId',
        validateParamsSchema(deleteUserSchema),
        (req: ValidatedRequest<DeleteUserSchema>, res: Response) => {
            const {params: {userId}} = req;

            UserModel
                .destroy({
                    where: {
                        id: userId
                    }
                })
                .then(() => res.json(userId))
        });
