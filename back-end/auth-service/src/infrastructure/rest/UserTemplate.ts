import { UserDto } from "../../domain/dto/User";
import { User } from "../../domain/entities/User";
import { UserRepository } from "./UserRepository";
import dotenv from "dotenv";

class UserTemplate  implements UserRepository {

	async fetchHashById(userID: string): Promise<string> {
		const rsp = await fetch(this.url + `/${userID}/hash`);
		if (!rsp) {
			return null;
		}
		const body: {passwordHash:string} = await rsp.json();
		console.log("passwordHash:" + body.passwordHash);
		return body.passwordHash;
	}
	private url = process.env.URI_USER_SERVICE || "http://user-service:3010/api/v1/users";

    public constructor() {} // Evita instanciar directamente

	public async getUserById(userId: string): Promise<User> {
		const rsp = await fetch(this.url + `/${userId}`);
		if (!rsp.ok) {
			return null;
		}
		const user:User = await rsp.json();
		console.log("user:" + user.id);
		console.log("user:" + user.password);
		return user;
	}

	 async getAllUsers(): Promise<User[]> {
		return [];
	}

	 async addUser(user: User): Promise<UserDto> {
		console.log("addUser:" + user);
		const response = await fetch(this.url + "/save-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		if (!response.ok)
			return null;
		const userDto: UserDto = await response.json();
		console.log("addUser response:", JSON.stringify(userDto, null, 2));
		return userDto;
	}

	 async updateUser(userId: string, updatedUser: User): Promise<void> {
		/* const index = this.users.findIndex(user => user.id === userId);
		if (index === -1) {
			throw new Error(`Chat with id ${userId} not found`);
		}
		this.users[index] = updatedUser; */
		await fetch(this.url + `/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		});
	}
}

export default UserTemplate;
