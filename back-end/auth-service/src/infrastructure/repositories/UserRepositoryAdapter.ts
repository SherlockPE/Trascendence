import UserRepositoryPort from "../../application/ports/UserRepositoryPort";
import { UserDto } from "../../domain/dto/User";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../rest/UserRepository";
import UserTemplate from "../rest/UserTemplate";

export default class UserRepositoryAdapter implements UserRepositoryPort {
    constructor(private userTemplate: UserRepository) {
    }


	async getHashById(userID: string): Promise<string> {
		return await this.userTemplate.fetchHashById(userID);
	}
	async getUserById(userID: string):Promise<User> {
		return await this.userTemplate.getUserById(userID);
	}
	async getUsers(): Promise<User[]> {
		return await this.userTemplate.getAllUsers();
	}
	async saveUser(user: User): Promise<UserDto> {
		return await this.userTemplate.addUser(user);
	}

}