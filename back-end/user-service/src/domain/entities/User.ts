
interface Connect {
	sender_id: string;
	receiver_id: string;
}

export interface User {
    id: string;
    name: string;
	passoword?: string;
    contacts?: Connect[];
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
  