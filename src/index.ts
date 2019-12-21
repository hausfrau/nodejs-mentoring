import express, {Request, Response, json} from 'express';

const app = express();
const {PORT = 3000} = process.env;

app.use(json());

type User = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
}

let users: User[] = [
    {
        id: "5",
        login: "user5",
        password: "678",
        age: 19,
        isDeleted: false
    },
    {
        id: "1",
        login: "user1",
        password: "123",
        age: 21,
        isDeleted: false
    },
    {
        id: "2",
        login: "user2",
        password: "234",
        age: 20,
        isDeleted: false
    }];

const findUser = (userId: string) => {
    return users.find((user) => user.id === userId);
};

const getUserData = (userId: string) => {
    const foundedUser = findUser(userId);

    if (foundedUser) {
        return {
            id: foundedUser.id,
            login: foundedUser.login,
            age: foundedUser.age,
            isDeleted: foundedUser.isDeleted
        };
    } else {
        return {};
    }
};

const getAutoSuggestUsers = (loginSubstring: string, limit: string) => {
    return users.filter((user: User) => user.login.indexOf(loginSubstring) !== -1)
        .sort((user1: User, user2: User) => {
        if (user1.login > user2.login) {
            return 1;
        }

        if (user1.login < user2.login) {
            return -1;
        }

        return 0;
    }).slice(0, +limit);
};

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello!');
});

app.get('/api/users', (_req: Request, res: Response) => {
    res.json(users);
});

app.get('/api/user/:userId', (req: Request, res: Response) => {
    const {params: {userId}} = req;
    const foundPrefix = findUser(userId) ? '' : 'not ';

    res.send(`User ${userId} is ${foundPrefix}found!`);
});

app.post('/api/users', (req: Request, res: Response) => {
    const {body} = req;
    const newUser = body;

    users.push(newUser);

   res.json(users);
});

app.put('/api/user/:userId', (req: Request, res: Response) => {
    const {body} = req;

    users = users.map((user: User) => user.id === body.id ? body : user);

    res.json(body.id);
});

app.delete('/api/user/:userId', (req: Request, res: Response) => {
    const {params: {userId}} = req;

    users = users.map((user: User) => user.id === userId ? ({
            ...user,
            isDeleted: true
        }) : user
    );

    res.json(getUserData(userId));
});

app.get('/api/users/:loginSubstring/:limit', (req: Request, res: Response) => {
    const {params: {loginSubstring, limit}} = req;

    res.json(getAutoSuggestUsers(loginSubstring, limit));
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
