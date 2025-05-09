"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser = void 0;
class AddUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        this.userRepository.saveUser(userId);
    }
}
exports.AddUser = AddUser;
