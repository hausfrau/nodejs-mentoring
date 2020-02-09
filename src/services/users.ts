import {Op} from 'sequelize';
import uuidv1 from 'uuid/v1';
import User from '../models/user';

class UsersService {
    static async filter(params: { loginSubstring: string; limit: number }) {
        const users = await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${params.loginSubstring}%`
                }
            },
            limit: params.limit
        });

        return users;
    }

    static async findById(id: string) {
        const user = await User.findByPk(id);

        return user;
    }

    static async add({login, age, password}: Partial<User>) {
        const user: User = await User.create({
            id: uuidv1(),
            login,
            password,
            age
        });

        return user;
    }

    static async updateById({id, login, age, password}: Partial<User>) {
        const user = await UsersService.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await user.update({login, age, password});

        return updatedUser;
    }

    static async deleteById(id: string) {
        const user = await UsersService.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        await user.update({isDeleted: true});

        return user;
    }
}

export default UsersService;
