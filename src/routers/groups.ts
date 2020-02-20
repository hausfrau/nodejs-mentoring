import {
    Response,
    Request,
    Router
} from 'express';
import {ValidatedRequest} from 'express-joi-validation';

import {
    postAndPutGroupSchema,
    getGroupByIdSchema,
    putGroupParamsSchema,
    deleteGroupSchema
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

export const groupsRouter = Router();

groupsRouter
    .get(
        '/',
        async (_req: Request, res: Response) => {
            try {
                const groups = await GroupsService.findAll();

                res.status(200).json(groups);
            } catch (error) {
                res.status(400).send(error);
            }
        })
    .post(
        '/',
        validateBodySchema(postAndPutGroupSchema),
        async (req: ValidatedRequest<PostGroupSchema>, res: Response) => {
            try {
                const group = await GroupsService.add({
                    name: req.body.name,
                    permissions: req.body.permissions
                });

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
                const group = await GroupsService.findById(req.params.id);

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
                const updatedGroup = GroupsService.updateById({
                    id: req.params.id,
                    name: req.body.name,
                    permissions: req.body.permissions
                });

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
                const deletedGroup = await GroupsService.deleteById(req.params.id);

                res.status(200).json(deletedGroup);
            } catch (error) {
                res.status(400).send(error);
            }
        });
