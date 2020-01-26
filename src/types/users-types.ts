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

export interface PostUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string;
        password: string;
        age: number;
    };
}

export interface PutUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        userId: string;
    };
}

export interface DeleteUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        userId: string;
    };
}
