"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadUsers = void 0;
class LoadUsers {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        return await this.userRepository.getUsers();
    }
}
exports.LoadUsers = LoadUsers;
