"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDtoSchema = void 0;
exports.userDtoSchema = {
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
