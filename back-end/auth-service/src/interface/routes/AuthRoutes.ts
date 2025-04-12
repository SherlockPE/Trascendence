import LogIn from "../../application/use-cases/login";
import { FastifyInstance } from "fastify";
import AuthController from "../controller/AuthController";
import UserRepositoryPort from "../../application/ports/UserRepositoryPort";
import UserRepositoryAdapter from "../../infrastructure/repositories/UserRepositoryAdapter";
import { sessionDtoSchema } from "../../domain/dto/SessionDto";
import SignUp from "../../application/use-cases/SignUp";
import { FastifyJWTOptions } from "@fastify/jwt";
import roleGuard from "../guards/RoleGuard";


export default function authRoutes(fastify: FastifyJWTOptions & FastifyInstance) {
  const userRepositoryPort: UserRepositoryPort = new UserRepositoryAdapter();
  const logIn: LogIn = new LogIn(userRepositoryPort);
  const signUp: SignUp = new SignUp(userRepositoryPort);
  const authController: AuthController = new AuthController(logIn, fastify, signUp);

  fastify.post(
    "/api/v1/auth/signin",
    {
      schema: {
        body: sessionDtoSchema,
        response: {
          200: {
            type: "object",
            properties: {
              jwt: { type: "string" },
            },
            required: ["jwt"],
          },
        },
        summary: "Login user",
        description: "Login user with username and password",
        tags: ["auth"],
      },
    },
    authController.initLogIn.bind(authController)
  );

  fastify.get("/api/v1/auth/verify", {
    preHandler: roleGuard(["view"]),
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            valid: { type: "boolean" },
            user: { type: "object" },
          },
          required: ["valid", "user"],
        },
      },
      summary: "Verify user",
      description: "Verify user with JWT",
      tags: ["auth"],
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  }, authController.verify.bind(authController));






  fastify.post(
    "/api/v1/auth/signup",
    {
      schema: {
        body: sessionDtoSchema,
        response: {
          200: {
            type: "object",
            properties: {
              jwt: { type: "string" },
            },
            required: ["jwt"],
          },
        },
        summary: "Login user",
        description: "Login user with username and password",
        tags: ["auth"],
      },
    },
    authController.initRegister.bind(authController)
  );
}
