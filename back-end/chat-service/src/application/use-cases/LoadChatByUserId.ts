import { ChatRepositoryPort } from "../ports/ChatRepositoryPort";
import { Chat } from "../../domain/entities/Chat";

export class LoadChatByUserId {
    constructor(private chatRepository: ChatRepositoryPort) {}

    async execute(userId: string): Promise<Chat[]> {
        console.log("find chats by:"+ userId)
        return await this.chatRepository.getChatByMembers([userId]);
    }
}
