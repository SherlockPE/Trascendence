import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { UpdateUser as UpdateUserDTO } from "../../domain/entities/User";


export class UpdateUser {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(userId: string, updates: UpdateUserDTO): Promise<void> {
        await this.userRepository.updateUser(userId, updates);
    }
}
