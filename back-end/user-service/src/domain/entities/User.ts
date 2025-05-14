
export interface User {
    id: string;
    username: string;
    alias?: string;
	  email?: string;
    avatar_url?: string;
  	passoword?: string;
    contacts?: string[];
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
	items: { type: 'string' },
  },
}
};

