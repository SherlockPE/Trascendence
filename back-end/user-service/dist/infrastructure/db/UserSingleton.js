"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserSingleton {
    constructor() {
        this.users = [];
    } // Evita instanciar directamente
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserSingleton();
            this.instance.users = [{
                    id: "1",
                    name: "User 1",
                    contacts: [
                        { sender_id: "1", receiver_id: "2" },
                        { sender_id: "1", receiver_id: "3" }
                    ],
                },
                {
                    id: "2",
                    name: "User 2",
                    contacts: [
                        { sender_id: "2", receiver_id: "1" },
                        { sender_id: "2", receiver_id: "3" }
                    ],
                },
                {
                    id: "3",
                    name: "User 3",
                    contacts: [
                        { sender_id: "3", receiver_id: "1" },
                        { sender_id: "3", receiver_id: "2" }
                    ],
                }];
        }
        return this.instance;
    }
    async getUserById(userId) {
        const chat = this.users.find(chat => chat.id === userId);
        if (!chat) {
            throw new Error(`Chat with id ${userId} not found`);
        }
        return chat;
    }
    async getAllUsers() {
        return this.users;
    }
    async addUser(user) {
        this.users.push(user);
    }
    async updateUser(userId, updatedUser) {
        const index = this.users.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new Error(`Chat with id ${userId} not found`);
        }
        this.users[index] = updatedUser;
    }
}
UserSingleton.instance = null;
exports.default = UserSingleton;
