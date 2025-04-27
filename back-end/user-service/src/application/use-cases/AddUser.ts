import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { User } from "../../domain/entities/User";

export class AddUser {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(user: User): Promise<User> {
       await this.userRepository.saveUser(user);
       user.passoword = undefined;
       user.contacts = undefined;
        return user;
    }
}
