import { UserDto } from "../../domain/dto/User";
import { User } from "../../domain/entities/User";

export default interface UserRepositoryPort {
	getUserById(userID: string);
	getHashById(userID: string): Promise<string>;
	getUsers() : Promise<User[]>;
	saveUser(user: User): Promise<UserDto>;

}
	