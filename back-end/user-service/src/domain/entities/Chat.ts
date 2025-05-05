import { Message } from "./Message";

export interface Chat {
	id: string;//uuid
	
	users: string[];
	messages: Message[];
	isGroupChat: boolean;
	title: string;
	//created_at: Date;
	//updated_at: Date;
	//owner: string;
}
