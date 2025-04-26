import { Chat } from "../../domain/entities/Chat";
import { Message } from "../../domain/entities/Message";
import { User } from "../../domain/entities/User";



export interface  UserRepositoryPort {
    getUserById(userID: string): Promise<User>;
    getUsers() : Promise<User[]>;
    existUsers(usersID: string[]);
    saveUser(chat: User): Promise<void>;
    updateUser(userId: string, updatedUser: User): Promise<void>;
}
