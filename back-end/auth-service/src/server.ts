import cors from "@fastify/cors";
import authRoutes from "./interface/routes/AuthRoutes";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(require("@fastify/jwt"), {
  secret: "supersecret",
});

fastify.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API",
      description: "API for authentication and authorization",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3020",
        description: "Development server",
      },
    ],
    tags: [{ name: "auth", description: "Auth related end-points" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme:'bearer',
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
});

fastify.register(swaggerUI, {
  routePrefix: "/docs",
});

fastify.register(cors, {
  origin: "http://localhost:3030",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
});





fastify.register(authRoutes);


fastify.listen({ port: 3020 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Servidor WebSocket corriendo en ${address}`);
});
