
export default interface SessionDto {
	username: string;
	password:string;
	name?:string;

}

export const sessionDtoSchema = {
	type: 'object',
	required: ['username', 'password'],
	properties: {
	  username: { type: 'string' },
	  password: { type: 'string' },
	},
  };