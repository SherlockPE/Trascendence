export interface Message {
    sender_id: string,
    content: {
        text: string;
    };
    chatId: string;
    //created_at: Date;
}
