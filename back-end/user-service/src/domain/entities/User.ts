interface Connect {
    sender_id: string;
    receiver_id: string;
}

export interface User {
    id: string;
    name: string;
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

export const userDtoSchema = {
	type: 'object',
	required: ['id','name'],
	properties: {
	  id: { type: 'string' },
	  name: { type: 'string' },
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

