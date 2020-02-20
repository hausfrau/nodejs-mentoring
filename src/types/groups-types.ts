import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type Group = {
    id: string;
    name: string;
    permissions: Permission[];
};

export interface GetGroupByIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export interface PostGroupSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        permissions: Array<Permission>;
    };
}

export interface PutGroupSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export interface DeleteGroupSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}
