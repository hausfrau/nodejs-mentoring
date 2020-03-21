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

        if (!group) {
            throw new Error(`Group is not created! [GroupsService.add] [params: name = ${name}]`);
        }

        return group;
    }

    async updateById({ id, name, permissions }: Partial<Group>) {
        const group = await this.findById(id);

        if (!group) {
            throw new Error(`Group is not found! [GroupsService.updateById] [params: id = ${id}]`);
        }

        const updatedGroup = group.update({ name, permissions });

        if (!updatedGroup) {
            throw new Error(`Group is not updated! [GroupsService.updateById] [params: id = ${id}]`);
        }

        return updatedGroup;
    }

    async deleteById(id: string) {
        const group = await this.findById(id);

        if (!group) {
            throw new Error(`Group is not found! [GroupsService.deleteById] [params: id = ${id}]`);
        }

        const deletedGroup = group.destroy();

        if (!deletedGroup) {
            throw new Error(`Group is not deleted! [GroupsService.deleteById] [params: id = ${id}]`);
        }

        return group;
    }

    async addUsersToGroup(groupId: string, userIds: string[]) {
        const group = await this.findById(groupId);

        if (!group) {
            throw new Error(`Group is not found! [GroupsService.addUsersToGroup] [params: id = ${groupId}]`);
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
            } else {
                throw new Error(`Users are not found! [GroupsService.addUsersToGroup] [params: userIds = ${userIds}]`);
            }
        });

        const addedUsers = group.getUsers();

        if (!addedUsers) {
            throw new Error(`Users are not added! [GroupsService.addUsersToGroup] [params: userIds = ${userIds}]`);
        }

        return addedUsers;
    }
}

export default GroupsService;
