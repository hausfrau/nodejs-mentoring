import {
    Model,
    DataTypes,
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin
} from 'sequelize';

import db from '../database';
import { Permission } from '../types/groups-types';
import User from './user';
import { UserGroup } from './user-group';

class Group extends Model {
    public id!: string;

    public name!: string;

    public permissions!: Array<Permission>;

    public getUsers!: BelongsToGetAssociationMixin<User>;

    public addUsers!: BelongsToManyAddAssociationMixin<User, User[]>;

    public readonly users?: User[];
}

Group.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
},
{
    sequelize: db,
    tableName: 'groups'
});

Group.belongsToMany(User, {
    as: 'users',
    through: {
        model: UserGroup
    },
    foreignKey: 'groupId',
    otherKey: 'userId',
    constraints: false
});

export default Group;
