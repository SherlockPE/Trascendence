import { User, UpdateUser } from "@user-service/domain/entities/User";



export default interface UserRepositoryPort {
	getUserById(userID: string);
	getUsers() : Promise<User[]>;
	saveUser(user: User): Promise<User>;
	updateUser(userId: string, updates: UpdateUser): Promise<User>;
}
	