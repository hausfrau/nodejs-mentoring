import uuidv1 from 'uuid/v1';
import Group from '../models/group';

class GroupsService {
    static async findAll() {
        const groups = await Group.findAll();

        return groups;
    }

    static async findById(id: string) {
        const group = await Group.findByPk(id);

        return group;
    }

    static async add({name, permissions}: Partial<Group>) {
        const group: Group = await Group.create({
            id: uuidv1(),
            name,
            permissions
        });

        return group;
    }

    static async updateById({id, name, permissions}: Partial<Group>) {
        const group = await GroupsService.findById(id);

        if (!group) {
            throw new Error('Group not found');
        }

        const updatedGroup = await group.update({name, permissions});

        return updatedGroup;
    }

    static async deleteById(id: string) {
        const group = await GroupsService.findById(id);

        if (!group) {
            throw new Error('Group not found');
        }

        await group.destroy({
            where: {
                id: id
            }
        });

        return id;
    }
}

export default GroupsService;
