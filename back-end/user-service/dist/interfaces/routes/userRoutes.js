"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const UserRepositoryAdapter_1 = require("../../infrastructure/repositories/UserRepositoryAdapter");
const LoadUser_1 = require("../../application/use-cases/LoadUser");
const UserController_1 = require("../controllers/UserController");
const AddUser_1 = require("../../application/use-cases/AddUser");
const UpdateUser_1 = require("../../application/use-cases/UpdateUser");
const User_1 = require("../../domain/entities/User");
const LoadUsers_1 = require("../../application/use-cases/LoadUsers");
async function userRoutes(fastify) {
    const userRepo = new UserRepositoryAdapter_1.UserRepositoryAdapter();
    const getUser = new LoadUser_1.LoadUser(userRepo);
    const saveUser = new AddUser_1.AddUser(userRepo);
    const updateUser = new UpdateUser_1.UpdateUser(userRepo);
    const getAllUsers = new LoadUsers_1.LoadUsers(userRepo);
    const userController = new UserController_1.UserController(getUser, saveUser, updateUser, getAllUsers);
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
                200: { type: 'object' },
            },
            summary: 'Get user',
            tags: ['user'],
        },
    }, userController.userById.bind(userController));
    fastify.post("/api/v1/users/save-user", {
        schema: {
            body: User_1.userDtoSchema,
            response: {
                200: User_1.userDtoSchema,
            },
            summary: 'Save user',
            tags: ['user'],
        },
    }, userController.saveUserHandler.bind(userController));
    fastify.post("/api/v1/users/:userId", {
        schema: {
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                },
                required: ['userId'],
            },
            body: User_1.userDtoSchema,
            response: {
                200: User_1.userDtoSchema,
            },
            summary: 'Update user',
            tags: ['user'],
        },
    }, userController.updateUserHandler.bind(userController));
    fastify.get("/api/v1/users", userController.getUsers.bind(userController));
    fastify.post("/api/v1/users", userController.postUser.bind(userController));
}
exports.userRoutes = userRoutes;
