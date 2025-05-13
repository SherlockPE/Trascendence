import { UserRepositoryPort } from "../../application/ports/UserRepositoryPort";
import { Chat } from "../../domain/entities/Chat";
import { Message } from "../../domain/entities/Message";
import { UpdateUser, User } from "../../domain/entities/User";
import { HandleException } from "../../domain/exception/HandleException";
import UserSingleton from "../db/UserSingleton";


export class UserRepositoryAdapter implements UserRepositoryPort {
    private userSingleton: UserSingleton;
    constructor() {
        this.init();
    }
    async updateUser(userId: string, updatedUser: UpdateUser): Promise<void> {
        const user:User= await this.userSingleton.getUserById(userId);
        if (updatedUser.alias)
            throw new HandleException("The alias can not be empty.", 400, "Bad Request");
        user.alias=updatedUser.alias;
        if (updatedUser.avatar_url)
            throw new HandleException("The avatar can not be empty.", 400, "Bad Request");
        user.avatar_url=updatedUser.avatar_url;
        return this.userSingleton.updateUser(userId, user);
    }
    getUsers(): Promise<User[]> {
        return this.userSingleton.getAllUsers();
    }
    async existUsers(usersID: string[]) {
      const response =   await fetch("http://localhost:3000/api/v1/users");

      response.status === 200 ? console.log("ok") : console.log("error");
    }

    async saveUser(user: User): Promise<void> {
        await this.userSingleton.addUser(user);
    }

    async getAllUsers(userIds: string[]): Promise<User[]> {
        const users = await this.userSingleton.getAllUsers();
        if (users.length <= 0) {
            throw new Error(`User with ID ${userIds} not found.`);
        }
        return users;
    }


    private async init() {
        this.userSingleton = await UserSingleton.getInstance();
    }

    async getUserById(userId: string): Promise<User> {
        const user:User = await this.userSingleton.getUserById(userId);
        if (!user) {
            throw new Error(`user with ID ${userId} not found.`);
        }
        return user;
    }
    async deleteUser(userId: string): Promise<void> {
        await this.userSingleton.deleteUser(userId);
}


}