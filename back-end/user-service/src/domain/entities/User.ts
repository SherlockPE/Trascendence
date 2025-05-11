
export interface User {
    id: string;
    name: string;
	avatar?: string;
	passoword?: string;
    contacts?: string[];
}

export interface UpdateUser {
    alias?: string;
    avatar_url?: string;
    is_online?: boolean;
}

export const userDtoSchema = {
	type: 'object',
	required: ['id','name'],
	properties: {
	  id: { type: 'string' },
	  avatar: { type: 'string' },
	  name: { type: 'string' },
	  contacts: {
		type: 'array',
		items: { type: 'string' },
	  },
	}
  };

