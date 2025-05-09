"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const userRoutes_1 = require("./interfaces/routes/userRoutes");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(swagger_1.default, {
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
fastify.register(swagger_ui_1.default, {
    routePrefix: '/docs',
});
fastify.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
fastify.register(userRoutes_1.userRoutes);
// Iniciar servidor
fastify.listen({ port: 3010, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor WebSocket corriendo en ${address}`);
});
