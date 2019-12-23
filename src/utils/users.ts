import {User} from '../types/users-types';

export const getUser = (users: User[], userId: string) => {
    return users.find((user) => user.id === userId);
};

export const getAutoSuggestUsers = (users: User[], loginSubstring: string, limit: number) => {
    return users.filter((user: User) => user.login.indexOf(loginSubstring) !== -1)
        .sort((user1: User, user2: User) => {
            if (user1.login > user2.login) {
                return 1;
            }

            if (user1.login < user2.login) {
                return -1;
            }

            return 0;
        }).slice(0, limit);
};