"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId, updatedUser) {
        this.userRepository.updateUser(userId, updatedUser);
    }
}
exports.UpdateUser = UpdateUser;
