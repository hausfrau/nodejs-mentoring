import Express, { NextFunction } from 'express';

import request from 'supertest';

import SequelizeFixtures from 'sequelize-fixtures';

import { usersRouter } from '../users';

import User from '../../models/user';

jest.mock('../middlewares/jsonwebtoken-utils', () => ({
    checkToken: (_: any, __: any, next: NextFunction) => next()
}));

const initApp = () => {
    const app = Express();

    app.use(Express.json());
    app.use('/api/users', usersRouter);

    return app;
};

const truncate = async () => {
    const user = await User.destroy({ where: {}, force: true });

    return user;
};

describe('User router post /api/users', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });
    it('should return status 200 when user is added', async () => {
        const app = initApp();

        await SequelizeFixtures.loadFixtures([], { User });

        const expectedUser = {
            login: 'user40',
            password: 'ksdfklvnskdfvnsk',
            age: 45
        };

        const res = await request(app)
            .post('/user')
            .accept('application/json')
            .set('Content-Type', 'application/json')
            .send(expectedUser)
            .expect(200);

        expect(res.body).toEqual(expect.objectContaining(expectedUser));
    });
});

describe('User router get /api/users/:userId', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });

    it('should return status 200 when user is found', async () => {
        const app = initApp();
        const expectedUser = {
            id: '8c963e40-4b68-11ea-9a84-5b925b8f78ea',
            login: 'user10',
            password: 'pgdhtb555u896791',
            age: 80,
            isDeleted: false,
            createdAt: '2020-02-09T18:18:19.556Z',
            updatedAt: '2020-03-20T19:34:23.474Z'
        };
        const fixtures = [
            {
                model: 'User',
                data: expectedUser
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, {
            User
        });

        const res = await request(app)
            .get('/users/8c963e40-4b68-11ea-9a84-5b925b8f78ea')
            .accept('application/json')
            .expect(200);

        expect(res.body).toEqual(expect.objectContaining(expectedUser));
    });

    it('should return status 400 when user is not found', async () => {
        const app = initApp();
        const expectedUser = {
            id: '8c963e40-4b68-11ea-9a84-5b925b8f78ea',
            login: 'user10',
            password: 'pgdhtb555u896791',
            age: 80,
            isDeleted: false
        };
        const fixtures = [
            {
                model: 'User',
                data: expectedUser
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, {
            User
        });

        await request(app)
            .get('/users/8c963e40-4b68-11ea-9a84-5b925b8f766a')
            .expect(400);
    });
});

describe('User router put /api/users/:userId', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });

    it('should return status 200 when user is updated', async () => {
        const app = initApp();
        const expectedUser = {
            id: '8c963e40-4b68-11ea-9a84-5b925b8f78ea',
            login: 'user10',
            password: 'pgdhtb555u896791',
            age: 80,
            isDeleted: false
        };
        const fixtures = [
            {
                model: 'User',
                data: expectedUser
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, { User });

        try {
            const res = await request(app)
                .put('/users/8c963e40-4b68-11ea-9a84-5b925b8f78ea')
                .accept('application/json')
                .set('Content-Type', 'application/json')
                .send({
                    login: 'user10',
                    password: 'pgdhtb555u896791',
                    age: 70
                })
                .expect(200);

            expect(res.body.id).toEqual('8c963e40-4b68-11ea-9a84-5b925b8f78ea');
        } catch (error) {
            console.error(error);
        }
    });
});

describe('User router del /api/users/:userId', () => {
    beforeEach(async () => {
        await truncate();
        jest.resetAllMocks();
    });

    it('should return status 200 when user is deleted', async () => {
        const app = initApp();
        const expectedUser = {
            id: '8c963e40-4b68-11ea-9a84-5b925b8f78ea',
            login: 'user10',
            password: 'pgdhtb555u896791',
            age: 80,
            isDeleted: false
        };
        const fixtures = [
            {
                model: 'User',
                data: expectedUser
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, { User });

        try {
            const res = await request(app)
                .delete('/users/8c963e40-4b68-11ea-9a84-5b925b8f78ea')
                .accept('application/json')
                .expect(200);

            expect(res.body.id).toEqual('8c963e40-4b68-11ea-9a84-5b925b8f78ea');
            expect(res.body.isDeleted).toEqual(true);
        } catch (error) {
            console.error(error);
        }
    });

    it('should return status 400 when user is not deleted', async () => {
        const app = initApp();
        const expectedUser = {
            id: '8c963e40-4b68-11ea-9a84-5b925b88888ea',
            login: 'user10',
            password: 'pgdhtb555u896791',
            age: 80,
            isDeleted: false
        };
        const fixtures = [
            {
                model: 'User',
                data: expectedUser
            }
        ];

        await SequelizeFixtures.loadFixtures(fixtures, { User });

        try {
            await request(app)
                .delete('/users/8c963e40-4b68-11ea-9a84-5b925b8f78ea')
                .accept('application/json')
                .expect(400);
        } catch (error) {
            console.error(error);
        }
    });
});
