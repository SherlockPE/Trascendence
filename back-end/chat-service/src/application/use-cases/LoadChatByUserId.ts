import { ChatRepositoryPort } from "../ports/ChatRepositoryPort";
import { Chat } from "../../domain/entities/Chat";
import { HandleException } from "../../domain/exception/HandleException";

export class LoadChatByUserId {
    constructor(private chatRepository: ChatRepositoryPort) {}

    async execute(jwtUserId: string, userId: string): Promise<Chat[]> {
        if (jwtUserId !== userId)
            throw new HandleException("Unauthorized access to chat data", 403, "Unauthorized");
        return await this.chatRepository.getChatByMembers([userId]).then((chats) => {
            if (!chats)
                throw new HandleException("Chat not found", 404, "Not Found");
            chats.forEach((chat) => {
                if (chat.isGroupChat){
                    chat.title = chat.title || "Group Chat";
                } else
                    chat.title = chat.users.find((user) => user !== userId) || "Private Chat";
            });
            return chats;
        });
    }
}
