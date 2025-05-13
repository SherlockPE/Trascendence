import { Chat } from "../../domain/entities/Chat";
import { Message } from "../../domain/entities/Message";
import { User, UpdateUser } from "../../domain/entities/User";




export interface  UserRepositoryPort {
    getUserById(userID: string): Promise<User>;
    getUsers() : Promise<User[]>;
    existUsers(usersID: string[]);
    saveUser(chat: User): Promise<void>;
    updateUser(userId: string, updatedUser: UpdateUser): Promise<void>;
    deleteUser(userId: string): Promise<void>; 
}
