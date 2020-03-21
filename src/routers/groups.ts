import {
    Response,
    Request,
    Router
} from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import {
    postAndPutGroupSchema,
    getGroupByIdSchema,
    putGroupParamsSchema,
    deleteGroupSchema,
    addUsersSchema
} from '../schemas/groups-api';
import {
    validateBodySchema,
    validateParamsSchema
} from '../validation/validation.js';
import {
    GetGroupByIdSchema,
    PostGroupSchema,
    PutGroupSchema,
    DeleteGroupSchema
} from '../types/groups-types';
import GroupsService from '../services/groups';
import Group from '../models/group';
import User from '../models/user';
import debug from '../middlewares/debug-logger';

export const groupsRouter = Router();
const groupsService = new GroupsService(Group, User);

groupsRouter
    .get(
        '/',
        async (req: Request, res: Response) => {
            try {
                debug(`Groups: [method: ${req.method}]`);
                const groups = await groupsService.findAll();

                debug(`Groups: ${groups ? 'groups are found' : 'groups are not found'}`);
                res.status(200).json(groups);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    //  This code to test the logging unhandled rejection by winston
    /* .get('/', (_req: Request, res: Response) => {
        groupsService.findAll().then((groups) => {
            Promise.reject();
            res.json(groups);
        });
    }) */
    .post(
        '/',
        validateBodySchema(postAndPutGroupSchema),
        async (req: ValidatedRequest<PostGroupSchema>, res: Response) => {
            try {
                debug(`Groups: [method: ${req.method}]`);
                const group = await groupsService.add({
                    name: req.body.name,
                    permissions: req.body.permissions
                });

                debug(`Groups: ${group ? 'groups is added' : 'group is not added'}`);
                res.status(200).json(group);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .get(
        '/:id',
        validateParamsSchema(getGroupByIdSchema),
        async (req: ValidatedRequest<GetGroupByIdSchema>, res: Response) => {
            try {
                debug(`Groups: [method: ${req.method}] [params.id: ${req.params.id}]`);
                const group = await groupsService.findById(req.params.id);

                debug(`Groups: ${group ? 'group is found' : 'group is not found'}`);
                res.status(200).json(group);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .put('/:id',
        validateBodySchema(postAndPutGroupSchema),
        validateParamsSchema(putGroupParamsSchema),
        async (req: ValidatedRequest<PutGroupSchema>, res: Response) => {
            try {
                debug(`Groups: [method: ${req.method}] [params.id: ${req.params.id}]`);
                const updatedGroup = await groupsService.updateById({
                    id: req.params.id,
                    name: req.body.name,
                    permissions: req.body.permissions
                });

                debug(`Groups: ${updatedGroup ? 'group is updated' : 'group is not updated'}`);
                res.status(200).json(updatedGroup);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .delete(
        '/:id',
        validateParamsSchema(deleteGroupSchema),
        async (req: ValidatedRequest<DeleteGroupSchema>, res: Response) => {
            try {
                debug(`Groups: [method: ${req.method}] [params.id: ${req.params.id}]`);
                const deletedGroup = await groupsService.deleteById(req.params.id);

                debug(`Groups: ${deletedGroup ? 'group is deleted' : 'group is not deleted'}`);
                res.status(200).json(deletedGroup);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .post(
        '/addUsers/:id',
        validateBodySchema(addUsersSchema),
        validateParamsSchema(putGroupParamsSchema),
        async (req: ValidatedRequest<PutGroupSchema>, res: Response) => {
            try {
                debug(`Groups: [method: ${req.method}] [params.id: ${req.params.id}]`);
                const addedUsers = await groupsService.addUsersToGroup(
                    req.params.id,
                    req.body.userIds
                );

                debug(`Groups: ${addedUsers ? 'users are added into group' : 'users are not added into groupd'}`);
                res.status(200).json(addedUsers);
            } catch (error) {
                res.status(400).json(error);
            }
        }
    );
