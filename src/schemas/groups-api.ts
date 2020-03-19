import Joi from '@hapi/joi';

export const postAndPutGroupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().required()
});

export const getGroupByIdSchema = Joi.object({
    id: Joi.string().required()
});

export const putGroupParamsSchema = Joi.object({
    id: Joi.string().required()
});

export const deleteGroupSchema = Joi.object({
    id: Joi.string().required()
});

const idSchema = Joi.string().guid({ version: ['uuidv1'] });

export const addUsersSchema = Joi.object({
    userIds: Joi.array().items(idSchema)
});
