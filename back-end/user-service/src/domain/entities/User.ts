

export interface User {
    id: string;
    name: string;
	passoword?: string;
    contacts?: string[];
}


export const userDtoSchema = {
	type: 'object',
	required: ['id','name'],
	properties: {
	  id: { type: 'string' },
	  name: { type: 'string' },
	  contacts: {
		type: 'array',
		items: { type: 'string' },
	  },
	}
  };
  