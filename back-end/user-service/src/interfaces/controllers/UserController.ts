import { FastifyRequest, FastifyReply } from "fastify";
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

    async postUser(req: FastifyRequest<{Body:NewUser}>, reply: FastifyReply) {

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

