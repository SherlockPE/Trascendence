
interface Connect {
	sender_id: string;
	receiver_id: string;
}

export interface UserDto {
    name: string;
    contacts: Connect[]; //Join
}

export const userDtoSchema = {
	type: 'object',
	required: ['name', 'contacts'],
	properties: {
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
  