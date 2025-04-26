import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class LoadUsers {
	constructor(private userRepository: UserRepositoryPort) {}

	async execute(): Promise<User[]> {
		return await this.userRepository.getUsers();
	}
}