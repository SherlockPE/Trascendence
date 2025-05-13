import { Chat } from "../../domain/entities/Chat";
import { User } from "../../domain/entities/User";

class UserSingleton  {
    private static instance: UserSingleton = null;
	private users: User[] = [];

    private constructor() {} // Evita instanciar directamente

    public static  getInstance(): UserSingleton {
        if (!this.instance) {
			this.instance = new UserSingleton();
			this.instance.users = [
			{
				id: "1",
				username: "User 1",
				email: "user1@example.com",
					passoword: "$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq",
				contacts: [
					{ sender_id: "1", receiver_id: "2" },
					{ sender_id: "1", receiver_id: "3" }
				],
				is_online: false,
			},
			{
				id: "2",
				username: "User 2",
				email: "user2@example.com",
					passoword: "$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq",
				contacts: [
					{ sender_id: "2", receiver_id: "1" },
					{ sender_id: "2", receiver_id: "3" }
				],
				is_online: false,
			},
			{
				id: "3",
				username: "User 3",
				email: "user3@example.com",
					passoword: "$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq",
				contacts: [
					{ sender_id: "3", receiver_id: "1" },
					{ sender_id: "3", receiver_id: "2" }
				],
				is_online: false,
			},
		];
        }
        return this.instance;
    }

	public async getUserById(userId: string): Promise<User> {
		const user:User = this.users.find(user => user.id === userId);
		if (!user) {
			throw new Error(`User with id ${userId} not found`);
		}
		return user;
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
			throw new Error(`User with id ${userId} not found`);
		}
		this.users[index] = updatedUser;
	}
	async deleteUser(userId: string): Promise<void> {
    const index = this.users.findIndex(user => user.id === userId);
    if (index === -1) {
        throw new Error(`User with id ${userId} not found`);
    }
    this.users.splice(index, 1);
}

}

export default UserSingleton;
