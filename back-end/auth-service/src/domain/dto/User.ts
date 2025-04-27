
interface Connect {
	sender_id: string;
	receiver_id: string;
}

export interface UserDto {
    username: string;
    contacts: Connect[]; //Join
}

export const userDtoSchema = {
	type: 'object',
	required: ['username',],
	properties: {
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
  