/*
import { FastifyInstance } from "fastify";
import { UserRepositoryAdapter } from "../../infrastructure/repositories/UserRepositoryAdapter";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { UserController } from "../controllers/UserController";
import { AddUser } from "../../application/use-cases/AddUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { userDtoSchema } from "../../domain/entities/User";
import { LoadUsers } from "../../application/use-cases/LoadUsers";
import { LoadHash } from "../../application/use-cases/LoadHash";


export async function userRoutes(fastify: FastifyInstance) {
    const userRepo = new UserRepositoryAdapter();
    const getUser = new LoadUser(userRepo);
    const saveUser = new AddUser(userRepo);
    const updateUser = new UpdateUser(userRepo);
	const getAllUsers = new LoadUsers(userRepo);
	const getHashByUserId = new LoadHash(userRepo);
    const userController = new UserController(getUser, saveUser, updateUser,getAllUsers, getHashByUserId);

	fastify.get("/api/v1/users/:userId/hash",{
		
		schema: {
		  params: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
            },
            required: ['userId'],
          },
		  response: {
			200: {
				type: 'object',
				properties: {
				  passwordHash: { type: 'string' },
				},
			  }
		  },
		  summary: 'Get password hash by userId',
		  tags: ['user'],
		},
	}, userController.getHashByUserId.bind(userController));


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
			200: userDtoSchema

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

	fastify.get("/api/v1/users",userController.getUsers.bind(userController))
	fastify.post("/api/v1/users", userController.postUser.bind(userController));
	
}*/

import { FastifyInstance } from "fastify";
import { UserRepositoryAdapter } from "../../infrastructure/repositories/UserRepositoryAdapter";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { AddUser } from "../../application/use-cases/AddUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { LoadUsers } from "../../application/use-cases/LoadUsers";
import { UserController } from "../controllers/UserController";
import { userDtoSchema } from "../../domain/entities/User";

export async function userRoutes(fastify: FastifyInstance) {
    const userRepo = new UserRepositoryAdapter();
    const getUser = new LoadUser(userRepo);
    const saveUser = new AddUser(userRepo);
    const updateUser = new UpdateUser(userRepo);
    const getAllUsers = new LoadUsers(userRepo);

    const userController = new UserController(getUser, saveUser, updateUser, getAllUsers);

    // POST /api/v1/users/register
    fastify.post("/api/v1/users/register", {
        schema: {
            body: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                201: userDtoSchema,
            },
            summary: 'Register new user',
            tags: ['user'],
        }
    }, userController.registerUser.bind(userController));

    // GET /api/v1/users/:userId
    fastify.get("/api/v1/users/:userId", {
        schema: {
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                },
                required: ['userId'],
            },
            response: {
                200: userDtoSchema,
            },
            summary: 'Get user by ID',
            tags: ['user'],
        }
    }, userController.getUserById.bind(userController));

    // PUT /api/v1/users/:userId
    fastify.put("/api/v1/users/:userId", {
        schema: {
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                },
                required: ['userId'],
            },
            body: {
                type: 'object',
                properties: {
                    alias: { type: 'string' },
                    avatar_url: { type: 'string' },
                    is_online: { type: 'boolean' }
                }
            },
            response: {
                200: userDtoSchema,
            },
            summary: 'Update user',
            tags: ['user'],
        }
    }, userController.updateUser.bind(userController));

    // GET /api/v1/users
    fastify.get("/api/v1/users", {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: userDtoSchema,
                }
            },
            summary: 'List all users',
            tags: ['user'],
        }
    }, userController.listUsers.bind(userController));

    // DELETE /api/v1/users/:userId (Opcional)
    fastify.delete("/api/v1/users/:userId", {
        schema: {
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                },
                required: ['userId'],
            },
            response: {
                204: { type: 'null' },
            },
            summary: 'Delete user',
            tags: ['user'],
        }
    }, userController.deleteUser.bind(userController));
}
