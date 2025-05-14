import { FastifyRequest, FastifyReply } from "fastify";
import { LoadHash } from "../../application/use-cases/LoadHash";
import { User, UpdateUser, NewUser } from "../../domain/entities/User";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { UpdateUser as UpdateUserUseCase } from "../../application/use-cases/UpdateUser";
import { AddUser } from "../../application/use-cases/AddUser";
import { LoadUsers } from "../../application/use-cases/LoadUsers";
import { DeleteUser } from "../../application/use-cases/DeleteUser";

interface UserParams {
    userId: string;
}

export class UserController {
    private getUser: LoadUser;
    private saveUser: AddUser;
    private updateUserUseCase: UpdateUserUseCase;
	private getAllUsers: LoadUsers;
    private getHash: LoadHash;
    private deleteUserUseCase: DeleteUser;


    
    constructor(getUser: LoadUser, saveUser: AddUser, updateUserUseCase: UpdateUserUseCase, getAllUsers: LoadUsers, getHash: LoadHash, deleteUserUseCase: DeleteUser) {
        this.getAllUsers = getAllUsers;
        this.getUser = getUser;
        this.saveUser = saveUser;
        this.updateUserUseCase = updateUserUseCase;
        this.getHash = getHash;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async getHashByUserId(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply) {
  
            const userId = req.params.userId as string;
            const hash = await this.getHash.execute(userId);
            reply.send({passwordHash: hash});
    
    }
    // GET /users/:userId
    async getUserById(req: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
   
            const userId = req.params.userId;
            const user = await this.getUser.execute(userId);
            reply.send(user);

    }

    // POST /users/register
    async registerUser(req: FastifyRequest<{ Body: NewUser }>, reply: FastifyReply) {
  
            const newUser = req.body as NewUser;

            const userToSave: User = {
                id: "", // luego deberías generar el ID
                username: newUser.userName,
                email: newUser.email,
                contacts: []
            };

            const savedUser = await this.saveUser.execute(userToSave);

            reply.code(201).send(savedUser);
 
    }

    // PUT /users/:userId
    async updateUser(req: FastifyRequest<{ Params: UserParams; Body: UpdateUser }>, reply: FastifyReply) {
            const userId = req.params.userId;
            const userUpdates = req.body as UpdateUser;
            const updatedUser = await this.updateUserUseCase.execute(userId, userUpdates);
            reply.send(updatedUser);

    }

    // GET /users
    async listUsers(req: FastifyRequest, reply: FastifyReply) {
    
        const users:User[] = await this.getAllUsers.execute();
        reply.send(users);
    }

    // DELETE /users/:userId 
    async deleteUser(req: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
        const userId = req.params.userId;
        await this.deleteUserUseCase.execute(userId);
        reply.code(204).send();

    }   

}
