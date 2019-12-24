import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation';

export type User = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
};

export interface GetUsersSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string;
        limit: string;
    };
}

export interface GetUsersByIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        userId: string;
    };
}