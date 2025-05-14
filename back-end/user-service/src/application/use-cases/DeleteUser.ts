import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class DeleteUser {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(userId: string): Promise<void> {
        await this.userRepository.deleteUser(userId);
    }
}
