import Message from "./Message";


export class Chat {
	id: string;
	active?: boolean;
	titleGroup: string;
	users: string[];
	isGroupChat: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	messages: Message[];


	constructor(
		id: string,
		active: boolean,
		titleGroup: string,
		users: string[],
		isGroupChat: boolean,
		createdAt: Date,
		updatedAt: Date,
		messages: Message[]
	) {
		this.id = id;
		this.active = active;
		this.titleGroup = titleGroup;
		this.users = users;
		this.isGroupChat = isGroupChat;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.messages = messages;
	}
}