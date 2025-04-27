import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class LoadHash {
    private userRepository: UserRepositoryPort;
    constructor(userRepository: UserRepositoryPort) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<String> {        
        const user: User = await this.userRepository.getUserById(userId);
        return user.passoword;
    }
}
