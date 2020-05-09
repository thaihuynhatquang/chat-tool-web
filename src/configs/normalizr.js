import { schema } from 'normalizr';

export const channel = new schema.Entity('channels');
export const thread = new schema.Entity('threads');
export const message = new schema.Entity('messages', {}, { idAttribute: 'mid' });
