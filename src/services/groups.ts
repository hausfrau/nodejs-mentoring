import { Op } from 'sequelize';
import uuidv1 from 'uuid/v1';

import User from '../models/user';
import Group from '../models/group';

import db from '../database';

class GroupsService {
    groupModel: typeof Group;

    userModel: typeof User;

    constructor(GroupModel: typeof Group, UserModel: typeof User) {
        this.groupModel = GroupModel;
        this.userModel = UserModel;
    }

    async findAll() {
        const groups = await this.groupModel.findAll();

        return groups;
    }

    async findById(id: string) {
        const group = await this.groupModel.findByPk(id);

        return group;
    }

    async add({ name, permissions }: Partial<Group>) {
        const group: Group = await this.groupModel.create({
            id: uuidv1(),
            name,
            permissions
        });

        return group;
    }

    async updateById({ id, name, permissions }: Partial<Group>) {
        const group = await this.findById(id);

        if (!group) {
            throw new Error('Group not found');
        }

        const updatedGroup = group.update({ name, permissions });

        return updatedGroup;
    }

    async deleteById(id: string) {
        const group = await this.findById(id);

        if (!group) {
            throw new Error('Group not found');
        }

        group.destroy();

        return group;
    }

    async addUsersToGroup(groupId: string, userIds: string[]) {
        const group = await this.findById(groupId);

        if (!group) {
            throw new Error('Group not found');
        }

        await db.transaction(async (transaction) => {
            const users = await this.userModel.findAll({
                where: {
                    id: {
                        [Op.in]: userIds
                    }
                }
            });

            if (users) {
                await group.addUsers(users, { transaction });
            }
        });

        return group.getUsers();
    }
}

export default GroupsService;
