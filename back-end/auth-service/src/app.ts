import cors from "@fastify/cors";
import authRoutes from "./interface/routes/AuthRoutes";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import dotenv from 'dotenv';
import fastifyBcrypt from 'fastify-bcrypt';
import { HandleException } from "./domain/exception/HandleException";
const errorCodes = require('fastify').errorCodes



/**
 * Builds and configures the Fastify application.
 * @returns {Promise<FastifyInstance>} The Fastify server instance.
 */
export async function buildApp():Promise<FastifyInstance> {
	dotenv.config();


	const fastify: FastifyInstance = Fastify({ logger: true });

	fastify.register(require("@fastify/jwt"), {
	secret: "supersecret",
	});

	fastify.register(fastifyBcrypt, {
	saltWorkFactor: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
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
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});

	fastify.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
		try {
			console.error(error);
			const isHandleException = error as unknown as HandleException;
			reply.status(isHandleException.code).send({
				error: isHandleException.name,
				message: isHandleException.message,
			});
		}
		catch (err) {
			reply.status(500).send({
				error: 'Internal Server Error',
				message: error.message,
			});
		}
	});

	return fastify;
}
