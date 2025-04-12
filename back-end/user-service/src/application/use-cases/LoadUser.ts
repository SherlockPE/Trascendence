import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class LoadUser {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(userId: string): Promise<User> {
        return this.userRepository.getUserById(userId);
    }
}
