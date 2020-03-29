import { Op } from 'sequelize';
import uuidv1 from 'uuid/v1';

import User from '../models/user';
import debug from '../middlewares/debug-logger';

class UsersService {
    userModel: typeof User;

    constructor(UserModal: typeof User) {
        this.userModel = UserModal;
    }

    async filter(params: { loginSubstring: string; limit: number }) {
        debug(`UsersService.filter: [params: {loginSubstring: ${params.loginSubstring}, limit: ${params.limit}}]`);
        const users = await this.userModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${params.loginSubstring}%`
                }
            },
            limit: params.limit
        });

        debug(`UsersService.filter: ${users ? 'users are found' : 'users are not found'}`);
        return users;
    }

    async findById(id: string) {
        debug(`UsersService.findById: [params: id = ${id}]`);
        const user = await this.userModel.findByPk(id);

        debug(`UsersService.findById: ${user ? 'user is found' : 'user is not found'}`);
        return user;
    }

    async add({ login, age, password }: Partial<User>) {
        debug(`UsersService.add: [params: login = ${login}]`);
        const user: User = await this.userModel.create({
            id: uuidv1(),
            login,
            password,
            age
        });

        if (!user) {
            throw new Error(`User is not added! [UsersService.add] [params: login = ${login}]`);
        }

        debug(`UsersService.add: ${user ? 'user is added' : 'user is not added'}`);
        return user;
    }

    async updateById({
        id, login, age, password
    }: Partial<User>) {
        debug(`UsersService.updateById: [params: id = ${id}]`);
        const user = await this.findById(id);

        if (!user) {
            throw new Error(`User not found! [UsersService.updateById] [params: id = ${id}]`);
        }

        const updatedUser = await user.update({ login, age, password });

        if (!updatedUser) {
            throw new Error(`User is not updated! [UsersService.updateById] [params: id = ${id}]`);
        }

        debug(`UsersService.updateById: ${updatedUser ? 'user is updated' : 'user is not updated'}`);
        return updatedUser;
    }

    async deleteById(id: string) {
        debug(`UsersService.deleteById: [params: id = ${id}]`);
        const user = await this.findById(id);

        if (!user) {
            throw new Error(`User not found! [UsersService.deleteById] [params: id = ${id}]`);
        }

        const deletedUser = await user.update({ isDeleted: true });

        if (!deletedUser) {
            throw new Error(`User is not deleted! [UsersService.deleteById] [params: id = ${id}]`);
        }

        return deletedUser;
    }
}

export default UsersService;
