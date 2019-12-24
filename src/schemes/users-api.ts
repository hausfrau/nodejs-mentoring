import Joi from '@hapi/joi';
// import PasswordComplexity from 'joi-password-complexity';
//
// const complexityOptions = {
//     min: 10,
//     max: 30,
//     lowerCase: 1,
//     upperCase: 1,
//     numeric: 1,
//     symbol: 1,
//     requirementCount: 2,
// }

export const postAndPutUserSchema = Joi
    .object()
    .keys({
        login: Joi.string().required(),
        password: Joi.string().regex(/^[A-Za-z0-9]{3,30}$/).required(), // new PasswordComplexity(complexityOptions),
        age: Joi.number().min(4).max(130).required()
    });