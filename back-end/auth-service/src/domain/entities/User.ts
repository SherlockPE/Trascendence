
interface Connect {
	sender_id: string;
	receiver_id: string;
}

export interface User {
    id: string;//uuid
    name: string;
    password?:string;
    contacts: Connect[]; //Join
}
