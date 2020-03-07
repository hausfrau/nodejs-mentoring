import {Model, DataTypes} from "sequelize";
import db from "../database";
import {Permission} from '../types/groups-types';

class Group extends Model {
    public id!: string;
    public name!: string;
    public permissions!: Array<Permission>;
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

export default Group;
