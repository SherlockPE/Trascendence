interface Connect {
    sender_id: string;
    receiver_id: string;
}

export interface User {
    id: string;
    username: string;
    alias?: string;
	email?: string;
    avatar_url?: string;
	passoword?: string;
    contacts?: Connect[];
}

export interface UpdateUser  {
    alias?: string;
    avatar_url?: string;
}

export interface NewUser {
    userName: string;
    email: string;
    password: string;
}
export const userDtoSchema = {
	type: 'object',
	required: ['id','username'],
	properties: {
	  id: { type: 'string' },
	  username: { type: 'string' },
	  contacts: {
		type: 'array',
		items: {
		  type: 'object',
		  required: ['sender_id', 'receiver_id'],
		  properties: {
			sender_id: { type: 'string' },
			receiver_id: { type: 'string' },
		  },
		},
	  },
	}
  };

