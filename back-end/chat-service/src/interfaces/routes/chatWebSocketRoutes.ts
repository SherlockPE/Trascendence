
import { ChatRepositoryAdapter } from "../../infrastructure/repositories/ChatRepositoryAdapter";
import { FastifyInstance } from "fastify";
import { UserRepositoryAdapter } from "../../infrastructure/repositories/UserRepositoryAdapter";
import { ChatWebSocketController } from "../controllers/ChatWebSocketController";
import { ListenMessage } from "../../application/use-cases/ListenMessage";
import CloseSession from "../../application/use-cases/CloseSession";
import { SessionRepositoryAdapter } from "../../infrastructure/repositories/SessionRepositoryAdapter";
import VerifyConnection from "../../application/use-cases/VerifyConnection";
import roleGuard from "../guards/RoleGuard";
import UserRepositoryStore from "src/infrastructure/rest/UserRepositoryStore";

export default async function chatWebSocketRoutes(fastify: FastifyInstance, userReositoryStore: UserRepositoryStore ) {
    const listenMessage = new ListenMessage(new ChatRepositoryAdapter(), new SessionRepositoryAdapter());
    const userRepository = new UserRepositoryAdapter(userReositoryStore);
    const sessionRepository = new SessionRepositoryAdapter();
    const closeSession = new CloseSession(sessionRepository);
    const verifyConnection = new VerifyConnection(userRepository, sessionRepository);
    const chatWSController = new ChatWebSocketController(listenMessage, closeSession, verifyConnection);
    //fastify.register(fastifyWebsocket);

    fastify.get('/chats/connect-ws',{
      preHandler: roleGuard(['view', 'admin'], userRepository),
        websocket: true,
        schema: {
          summary: 'WebSocket Chat Connection',
          description: 'Este endpoint establece una conexión WebSocket con el servidor para chats en tiempo real.',
          tags: ['chat-ws'],
          querystring: {
            type: 'object',
            properties: {
                userId: { type: 'number' },
            },
            required: ['userId'],
            },
          response: {
            101: {
              description: 'Switching Protocols (WebSocket handshake)',
            },
          }
        }
      }, chatWSController.handleConnection.bind(chatWSController));
}