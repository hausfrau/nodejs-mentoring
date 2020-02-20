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
