
import LoadMessage from "../../application/use-cases/LoadMessage";
import { ChatRepositoryAdapter } from "../../infrastructure/repositories/ChatRepositoryAdapter";
import { FastifyInstance } from "fastify";
import { ChatController } from "../controllers/ChatController";
import { LoadChat } from "../../application/use-cases/LoadChat";
import { LoadChatByUserId } from "../../application/use-cases/LoadChatByUserId";
import { chatDtoSchema, chatDtoSchemaArray, chatDtoSchemaArrayResponse } from "../../domain/entities/Chat";
import { messageDtoSchemaArray, messageDtoSchemaArrayResponse } from "../../domain/entities/Message";

export async function chatRoutes(fastify: FastifyInstance) {
    const messageRepo = new ChatRepositoryAdapter();
    const getMessages = new LoadMessage(messageRepo);
    const getChatById = new LoadChatByUserId(messageRepo);

    const getChat = new LoadChat(messageRepo);
    const chatController = new ChatController(getMessages, getChat, getChatById);

    fastify.get("/chats/:chatId/messages", {
		schema: {
		  params: {
            type: 'object',
            properties: {
              chatId: { type: 'string' },
            },
            required: ['chatId'],
          },
		  response: {
			200: messageDtoSchemaArray,
		  },
		  summary: 'Get messages by chatId',
		  tags: ['chat'],
		},
	  },chatController.getMessagesHandler.bind(chatController));
    fastify.get("/chats/:chatId",{
		schema: {
		  params: {
            type: 'object',
            properties: {
              chatId: { type: 'string' },
            },
            required: ['chatId'],
          },
		  response: {
			200: chatDtoSchema,
		  },
		  summary: 'Get messages by chatId',
		  tags: ['chat'],
		},
	  } ,chatController.getChatHandler.bind(chatController));
    fastify.get("/chats/user/:userId",{
		schema: {
		  params: {
            type: 'object',
            properties: {
                userId: { type: 'string' },
            },
            required: ['userId'],
          },
		  response: {
			200: chatDtoSchemaArray,
		  },
		  summary: 'Get messages by chatId',
		  tags: ['chat'],
		},
	  }, chatController.getChatsByIdHandler.bind(chatController));
    //fastify.get('/chats/connect-ws', { websocket: true }, chatController.handleWebSocketConnection.bind(chatController));
}