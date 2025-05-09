/*import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../../domain/entities/User";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { AddUser } from "../../application/use-cases/AddUser";
import { LoadUsers } from "../../application/use-cases/LoadUsers";
import { LoadHash } from "../../application/use-cases/LoadHash";

interface UserParams {
    userId: string;
}

interface NewUser {
    userName: string;
    email: string;
    password: string;
}

export class UserController {
    private getUser: LoadUser;
    private saveUser: AddUser;
    private updateUser: UpdateUser;
	private getAllUsers: LoadUsers;
    private getHash: LoadHash;


    
    constructor(getUser: LoadUser, saveUser: AddUser, updateUser: UpdateUser, getAllUsers: LoadUsers, getHash: LoadHash) {
        this.getAllUsers = getAllUsers;
        this.getUser = getUser;
        this.saveUser = saveUser;
        this.updateUser = updateUser;
        this.getHash = getHash;
    }
    async userById(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply) {
        try {
            const userId = req.params.userId as string;
            const user:User = await this.getUser.execute(userId);
            reply.send(user);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: `Error al obtener el usuario ${req.params.userId}` });
        }
    }
    async saveUserHandler(req: FastifyRequest<{Body: User}>, reply: FastifyReply) {
        try {
            console.log(req.body);
            const user: User = req.body;
            console.log(JSON.stringify(user, null, 2));
            const rsp = await this.saveUser.execute(user);
            reply.send(rsp);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al Guardar el usuario" });
        }
    }
    async updateUserHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply) {
        try {
            console.log(req.body);
            const user: User = JSON.parse(req.body.toString());
            const rsp = await this.updateUser.execute(req.params.userId , user);
            reply.send(rsp);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al Guardar el usuario" });
        }
    }

    async postUser(req: FastifyRequest<{ Body: NewUser }>, reply: FastifyReply) {
        try {
            const newUser: NewUser = req.body;
    
            const userToSave: User = {
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
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error al crear el usuario" });
        
        }
     

    }
    async getUsers(req: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.getAllUsers.execute();    
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ error: "Error al obtener mensajes" });
        }
    }
    async getHashByUserId(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply) {
        try {
            const userId = req.params.userId as string;
            const hash = await this.getHash.execute(userId);
            reply.send({passwordHash: hash});
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: `Error al obtener el hash del usuario ${req.params.userId}` });
        }
    }
}

*/

import { FastifyRequest, FastifyReply } from "fastify";
import { User, NewUser, UpdateUser } from "../../domain/entities/User";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { UpdateUser as UpdateUserUseCase } from "../../application/use-cases/UpdateUser";
import { AddUser } from "../../application/use-cases/AddUser";
import { LoadUsers } from "../../application/use-cases/LoadUsers";

interface UserParams {
    userId: string;
}

export class UserController {
    private getUser: LoadUser;
    private saveUser: AddUser;
    private updateUserUseCase: UpdateUserUseCase;
    private getAllUsers: LoadUsers;

    constructor(getUser: LoadUser, saveUser: AddUser, updateUserUseCase: UpdateUserUseCase, getAllUsers: LoadUsers) {
        this.getUser = getUser;
        this.saveUser = saveUser;
        this.updateUserUseCase = updateUserUseCase;
        this.getAllUsers = getAllUsers;
    }

    // GET /users/:userId
    async getUserById(req: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
        try {
            const userId = req.params.userId;
            const user = await this.getUser.execute(userId);
            reply.send(user);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error fetching user" });
        }
    }

    // POST /users/register
    async registerUser(req: FastifyRequest<{ Body: NewUser }>, reply: FastifyReply) {
        try {
            const newUser = req.body as NewUser;

            const userToSave: User = {
                id: "", // luego deberías generar el ID
                username: newUser.username,
                email: newUser.email,
                contacts: [],
                is_online: false,
            };

            const savedUser = await this.saveUser.execute(userToSave);

            reply.code(201).send(savedUser);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error creating user" });
        }
    }

    // PUT /users/:userId
    async updateUser(req: FastifyRequest<{ Params: UserParams; Body: UpdateUser }>, reply: FastifyReply) {
        try {
            const userId = req.params.userId;
            const userUpdates = req.body as UpdateUser;
            const updatedUser = await this.updateUserUseCase.execute(userId, userUpdates);
            reply.send(updatedUser);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error updating user" });
        }
    }

    // GET /users
    async listUsers(req: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.getAllUsers.execute();
            reply.send(users);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error listing users" });
        }
    }

    // DELETE /users/:userId (Opcional si quieres añadirlo después)
    async deleteUser(req: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
        try {
            const userId = req.params.userId;
            // Faltaría hacer un caso de uso DeleteUser
            reply.code(204).send();
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Error deleting user" });
        }
    }
}
