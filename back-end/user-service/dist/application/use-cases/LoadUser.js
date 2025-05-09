"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadUser = void 0;
class LoadUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        return this.userRepository.getUserById(userId);
    }
}
exports.LoadUser = LoadUser;
