import Fastify, { FastifyInstance } from "fastify";
import { chatRoutes } from "./interfaces/routes/chatRoutes";
import fastifyWebsocket from "@fastify/websocket";
import { chatWebSocketRoutes } from "./interfaces/routes/chatWebSocketRoutes";
import cors from '@fastify/cors';
import fastifySwagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";


const fastify: FastifyInstance = Fastify({ logger: true ,}); 

fastify.register(fastifySwagger, {
	openapi: {
		openapi: '3.0.0',
		info: {
		  title: 'Test swagger',
		  description: 'Testing the Fastify swagger API',
		  version: '0.1.0'
		},
		servers: [
		  {
			url: 'http://localhost:3000',
			description: 'Development server'
		  }
		],
		tags: [
		  { name: 'chat', description: 'Chat related end-points' },
		  { name: 'chat-ws', description: 'Chat Websocket related end-points' }
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

// Instancia del adaptador WebSocket
fastify.register(fastifyWebsocket);
fastify.register(chatWebSocketRoutes);
fastify.register(chatRoutes);


fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor WebSocket corriendo en ${address}`);
});
