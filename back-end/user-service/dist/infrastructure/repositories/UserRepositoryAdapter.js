"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryAdapter = void 0;
const UserSingleton_1 = __importDefault(require("../db/UserSingleton"));
class UserRepositoryAdapter {
    constructor() {
        this.init();
    }
    updateUser(userId, updatedUser) {
        return this.userSingleton.updateUser(userId, updatedUser);
    }
    getUsers() {
        return this.userSingleton.getAllUsers();
    }
    async existUsers(usersID) {
        const response = await fetch("http://localhost:3000/api/v1/users");
        response.status === 200 ? console.log("ok") : console.log("error");
    }
    async saveUser(user) {
        await this.userSingleton.addUser(user);
    }
    async getAllUsers(userIds) {
        const users = await this.userSingleton.getAllUsers();
        if (users.length <= 0) {
            throw new Error(`User with ID ${userIds} not found.`);
        }
        return users;
    }
    async init() {
        this.userSingleton = await UserSingleton_1.default.getInstance();
    }
    async getUserById(userId) {
        const user = await this.userSingleton.getUserById(userId);
        if (!user) {
            throw new Error(`user with ID ${userId} not found.`);
        }
        return user;
    }
}
exports.UserRepositoryAdapter = UserRepositoryAdapter;
