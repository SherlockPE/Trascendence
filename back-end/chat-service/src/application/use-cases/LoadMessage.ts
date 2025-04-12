import { ChatRepositoryPort } from "../ports/ChatRepositoryPort";
import { Message } from "../../domain/entities/Message";

export default class LoadMessage {
    private messageRepository: ChatRepositoryPort;
    constructor(messageRepository: ChatRepositoryPort) {
        this.messageRepository = messageRepository
    }

    async execute(chatId: string): Promise<Message[]> {
        return this.messageRepository.getMessagesByChatId(chatId);
    }
}
