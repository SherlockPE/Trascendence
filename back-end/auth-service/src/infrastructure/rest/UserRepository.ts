import { UserDto } from "../../domain/dto/User";
import { User } from "../../domain/entities/User";



export interface UserRepository {
	fetchHashById(userID: string): Promise<string>;
	getUserById(userId: string): Promise<User>;
	getAllUsers(): Promise<User[]>;
	addUser(user: User): Promise<UserDto>;
	updateUser(userId: string, updatedUser: User): Promise<void>;
}