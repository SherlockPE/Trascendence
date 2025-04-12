
interface Connect {
	sender_id: string;
	receiver_id: string;
}

export interface User {
    id: string;//uuid
    name: string;
    contacts: Connect[]; //Join
}