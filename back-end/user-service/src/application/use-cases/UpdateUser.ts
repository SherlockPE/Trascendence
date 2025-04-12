import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class UpdateUser {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(userId: string, updatedUser: User): Promise<void> {
        this.userRepository.updateUser(userId, updatedUser);
    }
}
