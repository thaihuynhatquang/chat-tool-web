import { schema } from 'normalizr';

export const channel = new schema.Entity('channels');
export const thread = new schema.Entity('threads');
export const customer = new schema.Entity('customers');
export const user = new schema.Entity('users');
export const message = new schema.Entity(
  'messages',
  {
    user: user,
    customer: customer,
  },
  { idAttribute: 'mid' },
);
message.define({ replies: { data: [message] } });
export const quickReply = new schema.Entity('quickReplies');
