import { Chat } from "../../domain/entities/Chat";
import { User } from "../../domain/entities/User";

class UserSingleton  {
    private static instance: UserSingleton = null;
	private users: User[] = [];

    private constructor() {} // Evita instanciar directamente

    public static  getInstance(): UserSingleton {
        if (!this.instance) {
			this.instance = new UserSingleton();
			this.instance.users = [{
					id: "1",
					name: "User 1",
					contacts: [
						{  sender_id: "1", receiver_id: "2" },
						{  sender_id: "1", receiver_id: "3" }
					],
				},
				{
					id: "2",
					name: "User 2",
					contacts: [
						{ sender_id: "2", receiver_id: "1" },
						{  sender_id: "2", receiver_id: "3" }
					],
				},
				{
					id: "3",
					name: "User 3",
					contacts: [
						{ sender_id: "3", receiver_id: "1" },
						{  sender_id: "3", receiver_id: "2" }
					],
				}];
        }
        return this.instance;
    }

	public async getUserById(userId: string): Promise<User> {
		const chat = this.users.find(chat => chat.id === userId);
		if (!chat) {
			throw new Error(`Chat with id ${userId} not found`);
		}
		return chat;
	}

	 async getAllUsers(): Promise<User[]> {
		return this.users;
	}

	 async addUser(user: User): Promise<void> {
		this.users.push(user);
	}
	 async updateUser(userId: string, updatedUser: User): Promise<void> {
		const index = this.users.findIndex(user => user.id === userId);
		if (index === -1) {
			throw new Error(`Chat with id ${userId} not found`);
		}
		this.users[index] = updatedUser;
	}
}

export default UserSingleton;
