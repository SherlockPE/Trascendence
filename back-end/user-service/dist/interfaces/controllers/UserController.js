"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(getUser, saveUser, updateUser, getAllUsers) {
        this.getAllUsers = getAllUsers;
        this.getUser = getUser;
        this.saveUser = saveUser;
        this.updateUser = updateUser;
    }
    async userById(req, reply) {
        try {
            const userId = req.params.user;
            const messages = await this.getUser.execute(userId);
            reply.send(messages);
        }
        catch (error) {
            reply.status(500).send({ error: "Error al obtener mensajes" });
        }
    }
    async saveUserHandler(req, reply) {
        try {
            console.log(req.body);
            const user = JSON.parse(req.body.toString());
            const rsp = await this.saveUser.execute(user);
            reply.send(rsp);
        }
        catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al Guardar el usuario" });
        }
    }
    async updateUserHandler(req, reply) {
        try {
            console.log(req.body);
            const user = JSON.parse(req.body.toString());
            const rsp = await this.updateUser.execute(req.params.user, user);
            reply.send(rsp);
        }
        catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al Guardar el usuario" });
        }
    }
    async postUser(req, reply) {
        try {
            const newUser = req.body;
            const userToSave = {
                id: '',
                username: newUser.userName,
                alias: '',
                email: newUser.email,
                avatar_url: '',
                contacts: [],
                is_online: false,
            };
            const savedUser = await this.saveUser.execute(userToSave);
            reply.code(201).send(savedUser);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error al crear el usuario" });
        }
    }
    async getUsers(req, reply) {
        try {
            const users = await this.getAllUsers.execute();
            reply.send(users);
        }
        catch (error) {
            reply.status(500).send({ error: "Error al obtener mensajes" });
        }
    }
}
exports.UserController = UserController;
