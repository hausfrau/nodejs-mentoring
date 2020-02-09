import {Model, DataTypes} from "sequelize";
import db from "../database";

class User extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;
}

User.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize: db,
        tableName: 'users'
    });

export default User;
