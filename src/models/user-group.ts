import { Model, DataTypes } from 'sequelize';
import db from '../database';

export class UserGroup extends Model {
    public id!: string;

    public userId!: string;

    public groupId!: string;
}

UserGroup.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            unique: false,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        groupId: {
            type: DataTypes.UUID,
            unique: false,
            allowNull: false,
            references: {
                model: 'groups',
                key: 'id'
            }
        }
    },
    {
        sequelize: db,
        modelName: 'UserGroup',
        tableName: 'users_groups',
        timestamps: false
    }
);
