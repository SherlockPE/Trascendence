import Fastify, { FastifyInstance } from "fastify";
import fastifyStatic from '@fastify/static';
import path from 'path';
import cors from '@fastify/cors';
import { userRoutes } from "./interfaces/routes/userRoutes";

import fastifySwagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';


const fastify: FastifyInstance = Fastify({logger: true});

fastify.register(fastifySwagger, {
	openapi: {
		openapi: '3.0.0',
		info: {
		  title: 'User Service API',
		  description: 'API for user management',
		  version: '0.1.0'
		},
		servers: [
		  {
			url: 'http://localhost:3010',
			description: 'Development server'
		  }
		],
		tags: [
		  { name: 'user', description: 'User related end-points' },
		],
		components: {
		  securitySchemes: {
			apiKey: {
			  type: 'apiKey',
			  name: 'apiKey',
			  in: 'header'
			}
		  }
		},
		externalDocs: {
		  url: 'https://swagger.io',
		  description: 'Find more info here'
		}
	  }
});

fastify.register(swaggerUI, {
	routePrefix: '/docs',
});


fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});


fastify.register(userRoutes);


// Iniciar servidor
fastify.listen({ port: 3010, host:'0.0.0.0'}, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor WebSocket corriendo en ${address}`);
});
