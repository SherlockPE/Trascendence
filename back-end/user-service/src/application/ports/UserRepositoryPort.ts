import { User } from "../../domain/entities/User";



export interface  UserRepositoryPort {
    getUserById(userID: string): Promise<User>;
    getUsers() : Promise<User[]>;
    existUsers(usersID: string[]);
    saveUser(chat: User): Promise<void>;
    updateUser(userId: string, updatedUser: User): Promise<void>;
}
