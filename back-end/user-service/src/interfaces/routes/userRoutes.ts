
import { FastifyInstance } from "fastify";
import { UserRepositoryAdapter } from "../../infrastructure/repositories/UserRepositoryAdapter";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { UserController } from "../controllers/UserController";
import { AddUser } from "../../application/use-cases/AddUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { userDtoSchema } from "../../domain/entities/User";


export async function userRoutes(fastify: FastifyInstance) {
    const userRepo = new UserRepositoryAdapter();
    const getUser = new LoadUser(userRepo);
    const saveUser = new AddUser(userRepo);
    const updateUser = new UpdateUser(userRepo);
    const userController = new UserController(getUser, saveUser, updateUser);

    fastify.get("/api/v1/users/:userId",{
		schema: {
		  params: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
            },
            required: ['userId'],
          },
		  response: {
			200: {type: 'object'},
		  },
		  summary: 'Get user',
		  tags: ['user'],
		},
	  }, userController.userById.bind(userController));
    fastify.post("/api/v1/users/save-user",{
		schema: {
		  body: userDtoSchema,
		  response: {
			200: userDtoSchema,
		  },
		  summary: 'Save user',
		  tags: ['user'],
		},
	  }, userController.saveUserHandler.bind(userController));
    fastify.post("/api/v1/users/:userId",{
		schema: {
            params: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
                },
                required: ['userId'],
              },
		  body: userDtoSchema,
		  response: {
			200: userDtoSchema,
		  },
		  summary: 'Update user',
		  tags: ['user'],
		},
	  }, userController.updateUserHandler.bind(userController));
}