import { FastifyRequest, FastifyReply } from "fastify";
import LoadMessage from "../../application/use-cases/LoadMessage";
import { LoadChat } from "../../application/use-cases/LoadChat";
import { LoadChatByUserId } from "../../application/use-cases/LoadChatByUserId";

interface ChatParams {
    chatId: string;
}
interface ChatByIdParams {
    userId: string;
}

export class ChatController {
    private getMessages: LoadMessage;
    private getChat: LoadChat;
    private getChatById: LoadChatByUserId;
    constructor(getMessages: LoadMessage, getChat: LoadChat, getChatById: LoadChatByUserId) {
        this.getMessages = getMessages;
        this.getChat = getChat;
        this.getChatById = getChatById;
    }
    async getMessagesHandler(req: FastifyRequest<{Params: ChatParams}>, reply: FastifyReply) {
        try {
            const chatId = req.params.chatId as string;
            const messages = await this.getMessages.execute(chatId);
            reply.send(messages);
        } catch (error) {
            reply.status(500).send({ error: "Error al obtener mensajes" });
        }
    }
    
    async getChatHandler(req: FastifyRequest<{Params: ChatParams}>, reply: FastifyReply) {
        try {
            const chatId = req.params.chatId as string;
            const chat = await this.getChat.execute(chatId);
            reply.send(chat);
        } catch (error) {
            reply.status(500).send({ error: "Error al obtener mensajes" });
        }
    }
    async getChatsByIdHandler(req: FastifyRequest<{Params: ChatByIdParams}>, reply: FastifyReply) {
        try {
            const chatId = req.params.userId as string;
            const chat = await this.getChatById.execute(chatId);
            reply.send(chat);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al obtener los chats" });
        }
    }

}
