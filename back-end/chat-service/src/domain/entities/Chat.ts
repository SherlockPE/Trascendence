import { Message, messageDtoSchema } from "./Message";

export interface Chat {
	id: string;//uuid
	
	users: string[];
	messages: Message[];
	isGroupChat: boolean;
	titleGroup: string;
	//created_at: Date;
	//updated_at: Date;
	//owner: string;
}


export const chatDtoSchema = {
	type: "object",
	properties: {
		id: { type: "string" },
		users: { type: "array", items: { type: "string" } },
		messages: { type: "array", items: messageDtoSchema },
		isGroupChat: { type: "boolean" },
		titleGroup: { type: "string" },
	},
	required: ["id", "users", "messages", "isGroupChat", "titleGroup"],
};

export const chatDtoSchemaArray = {
	type: "array",
	items: chatDtoSchema,
};
export const chatDtoSchemaArrayResponse = {
	type: "object",
	properties: {
		chats: chatDtoSchemaArray,
	},
	required: ["chats"],
};