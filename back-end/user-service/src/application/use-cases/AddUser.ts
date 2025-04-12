import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class AddUser {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(userId: User): Promise<void> {
        this.userRepository.saveUser(userId);
    }
}
