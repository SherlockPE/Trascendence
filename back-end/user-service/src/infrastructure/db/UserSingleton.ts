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
					passoword: "$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq",
					contacts: [
						"2",
						"3"
					],
				},
				{
					id: "2",
					name: "User 2",
					passoword: "$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq",
					contacts: [
						"1",
						"3"
					],
				},
				{
					id: "3",
					name: "User 3",
					passoword: "$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq",
					contacts: [
						"1",
						"2"
					],
				}];
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
}

export default UserSingleton;
