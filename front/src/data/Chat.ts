

export class Chat {
	id: string;
	titleGroup: string;
	users: string[];
	isGroupChat: boolean;
	createdAt: Date;
	updatedAt: Date;
	messages: [{
		chatId:string;
		content: {
			text: string;
		};
		sender_id: number;
	}];
	constructor(
		id: string,
		titleGroup: string,
		users: string[],
		isGroupChat: boolean,
		createdAt: Date,
		updatedAt: Date,
		messages: [{
			chatId: string;
			content: {
				text: string;
			};
			sender_id: number;
		}]
	) {
		this.id = id;
		this.titleGroup = titleGroup;
		this.users = users;
		this.isGroupChat = isGroupChat;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.messages = messages;
	}
}