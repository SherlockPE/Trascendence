import { User } from "../../domain/entities/User";


export default interface UserRepositoryPort {
	getUserById(userID: string);
	getUsers() : Promise<User[]>;
	saveUser(user: User): Promise<User>;
}
	