import { User } from "../../domain/entities/User";



export interface  UserRepositoryPort {
    getUserById(userID: string);
    getUsers() : Promise<User[]>;
    saveUser(chat: User): Promise<void>;
}
