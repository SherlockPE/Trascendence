import { ChatRepositoryPort } from "../ports/ChatRepositoryPort";
import { Chat } from "../../domain/entities/Chat";

export class LoadChat {
    constructor(private chatRepository: ChatRepositoryPort) {}

    async execute(chatId: string): Promise<Chat> {
        return await this.chatRepository.getChatById(chatId);
    }
}
