import {
    Response,
    Router
} from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import {
    postAndPutUserSchema,
    getUsersSchema,
    getUserByIdSchema,
    putUserParamsSchema,
    deleteUserSchema
} from '../schemas/users-api';
import {
    validateBodySchema,
    validateQuerySchema,
    validateParamsSchema
} from '../validation/validation.js';
import {
    GetUsersSchema,
    GetUsersByIdSchema,
    PostUserSchema,
    PutUserSchema,
    DeleteUserSchema
} from '../types/users-types';
import UsersService from '../services/users';
import User from '../models/user';

export const usersRouter = Router();
const usersService = new UsersService(User);

usersRouter
    .get(
        '/',
        validateQuerySchema(getUsersSchema),
        async (req: ValidatedRequest<GetUsersSchema>, res: Response) => {
            try {
                const limit = parseInt(req.query.limit, 10) || 1;
                const { login } = req.query;

                const filteredUsers = await usersService.filter({
                    loginSubstring: login,
                    limit
                });

                res.status(200).json(filteredUsers);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .post(
        '/',
        validateBodySchema(postAndPutUserSchema),
        async (req: ValidatedRequest<PostUserSchema>, res: Response) => {
            try {
                const user = await usersService.add({
                    login: req.body.login,
                    password: req.body.password,
                    age: req.body.age
                });

                res.status(200).json(user);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .get(
        '/:userId',
        validateParamsSchema(getUserByIdSchema),
        async (req: ValidatedRequest<GetUsersByIdSchema>, res: Response) => {
            try {
                const user = await usersService.findById(req.params.userId);

                res.status(200).json(user);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .put('/:userId',
        validateBodySchema(postAndPutUserSchema),
        validateParamsSchema(putUserParamsSchema),
        async (req: ValidatedRequest<PutUserSchema>, res: Response) => {
            try {
                const updatedUser = usersService.updateById({
                    id: req.params.userId,
                    login: req.body.login,
                    password: req.body.password,
                    age: req.body.age
                });

                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .delete(
        '/:userId',
        validateParamsSchema(deleteUserSchema),
        async (req: ValidatedRequest<DeleteUserSchema>, res: Response) => {

            try {
                const deletedUser = await usersService.deleteById(req.params.userId);

                res.status(200).json(deletedUser);
            } catch (error) {
                res.status(400).send(error);
            }
        });
