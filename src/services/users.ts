import { Op } from 'sequelize';
import uuidv1 from 'uuid/v1';
import User from '../models/user';

class UsersService {
    userModel: typeof User;

    constructor(UserModal: typeof User) {
        this.userModel = UserModal;
    }

    async filter(params: { loginSubstring: string; limit: number }) {
        const users = await this.userModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${params.loginSubstring}%`
                }
            },
            limit: params.limit
        });

        return users;
    }

    async findById(id: string) {
        const user = await this.userModel.findByPk(id);

        return user;
    }

    async add({ login, age, password }: Partial<User>) {
        const user: User = await this.userModel.create({
            id: uuidv1(),
            login,
            password,
            age
        });

        return user;
    }

    async updateById({
        id, login, age, password
    }: Partial<User>) {
        const user = await this.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await user.update({ login, age, password });

        return updatedUser;
    }

    async deleteById(id: string) {
        const user = await this.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        await user.update({ isDeleted: true });

        return user;
    }
}

export default UsersService;
