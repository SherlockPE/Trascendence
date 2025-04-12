import UserRepositoryPort from "../../application/ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";
import UserTemplate from "../rest/UserTemplate";

export default class UserRepositoryAdapter implements UserRepositoryPort {
	private userTemplate: UserTemplate;
    constructor() {
        this.init();
    }

    private async init() {
        this.userTemplate = new UserTemplate();
    }
	
	async getUserById(userID: string):Promise<User> {
		return await this.userTemplate.getUserById(userID);
	}
	async getUsers(): Promise<User[]> {
		return await this.userTemplate.getAllUsers();
	}
	async saveUser(user: User): Promise<User> {
		return await this.userTemplate.addUser(user);
	}

}