interface Connect {
    sender_id: string;
    receiver_id: string;
}

export interface User {
    id: string;
    username: string;
    alias?: string;
    email: string;
    avatar_url?: string;
    contacts: Connect[];
    is_online: boolean;
}

export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUser {
    alias?: string;
    avatar_url?: string;
    is_online?: boolean;
}

export const userDtoSchema = {
  type: 'object',
  required: ['id', 'username', 'email', 'contacts', 'is_online'],
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    alias: { type: 'string' },
    email: { type: 'string' },
    avatar_url: { type: 'string' },
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
    is_online: { type: 'boolean' },
  }
};
