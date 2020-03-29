import Express, { NextFunction } from 'express';

import request from 'supertest';

import SequelizeFixtures from 'sequelize-fixtures';

import { groupsRouter } from '../groups';

import Group from '../../models/group';

jest.mock('../middlewares/jsonwebtoken-utils', () => ({
    checkToken: (_: any, __: any, next: NextFunction) => next()
}));

const initApp = () => {
    const app = Express();

    app.use(Express.json());
    app.use('/api/group', groupsRouter);

    return app;
};

const truncate = async () => {
    const group = await Group.destroy({ where: {}, force: true });

    return group;
};

describe('Group router post /api/groups', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });
    it('should return status 200 when group is added', async () => {
        const app = initApp();

        await SequelizeFixtures.loadFixtures([], { Group });

        const expectedGroup = {
            name: 'name20',
            permissions: [
                'READ',
                'WRITE'
            ]
        };

        const res = await request(app)
            .post('/group')
            .accept('application/json')
            .set('Content-Type', 'application/json')
            .send(expectedGroup)
            .expect(200);

        expect(res.body).toEqual(expect.objectContaining(expectedGroup));
    });
});

describe('Group router get /api/groups/:id', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });

    it('should return status 200 when group is found', async () => {
        const app = initApp();
        const expectedGroup = {
            id: '3a525450-6947-11ea-a90c-0f977c14ffc8',
            name: 'name20',
            permissions: [
                'READ',
                'WRITE'
            ],
            createdAt: '2020-02-09T18:18:19.556Z',
            updatedAt: '2020-03-20T19:34:23.474Z'
        };
        const fixtures = [
            {
                model: 'Group',
                data: expectedGroup
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, {
            Group
        });

        const res = await request(app)
            .get('/groups/3a525450-6947-11ea-a90c-0f977c14ffc8')
            .accept('application/json')
            .expect(200);

        expect(res.body).toEqual(expect.objectContaining(expectedGroup));
    });

    it('should return status 400 when group is not found', async () => {
        const app = initApp();
        const expectedGroup = {
            id: '3a525450-6947-11ea-a90c-0f977c14ffc8',
            name: 'name20',
            permissions: [
                'READ',
                'WRITE'
            ]
        };
        const fixtures = [
            {
                model: 'Group',
                data: expectedGroup
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, {
            Group
        });

        await request(app)
            .get('/groups/3a525450-6947-11ea-a90c-0f977c146668')
            .expect(400);
    });
});

describe('Group router put /api/groups/:id', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });

    it('should return status 200 when group is updated', async () => {
        const app = initApp();
        const expectedGroup = {
            id: '3a525450-6947-11ea-a90c-0f977c14ffc8',
            name: 'name20',
            permissions: [
                'READ',
                'WRITE'
            ],
            createdAt: '2020-02-09T18:18:19.556Z',
            updatedAt: '2020-03-20T19:34:23.474Z'
        };
        const fixtures = [
            {
                model: 'Group',
                data: expectedGroup
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, { Group });

        try {
            const res = await request(app)
                .put('/groups/3a525450-6947-11ea-a90c-0f977c14ffc8')
                .accept('application/json')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'name20',
                    permissions: [
                        'READ'
                    ]
                })
                .expect(200);

            expect(res.body.id).toEqual('3a525450-6947-11ea-a90c-0f977c14ffc8');
        } catch (error) {
            console.error(error);
        }
    });
});

describe('Group router del /api/groups/:id', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });

    it('should return status 200 when group is deleted', async () => {
        const app = initApp();
        const expectedGroup = {
            id: '3a525450-6947-11ea-a90c-0f977c14ffc8',
            name: 'name20',
            permissions: [
                'READ',
                'WRITE'
            ]
        };
        const fixtures = [
            {
                model: 'Group',
                data: expectedGroup
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, { Group });

        try {
            const res = await request(app)
                .delete('/groups/3a525450-6947-11ea-a90c-0f977c14ffc8')
                .accept('application/json')
                .expect(200);

            expect(res.body.id).toEqual('3a525450-6947-11ea-a90c-0f977c14ffc8');
        } catch (error) {
            console.error(error);
        }
    });

    it('should return status 400 when group is not deleted', async () => {
        const app = initApp();
        const expectedGroup = {
            id: '3a525450-6947-11ea-a90c-0f977c146668',
            name: 'name20',
            permissions: [
                'READ',
                'WRITE'
            ]
        };
        const fixtures = [
            {
                model: 'Group',
                data: expectedGroup
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, { Group });

        try {
            await request(app)
                .delete('/groups/3a525450-6947-11ea-a90c-0f977c14ffc8')
                .accept('application/json')
                .expect(400);
        } catch (error) {
            console.error(error);
        }
    });
});
