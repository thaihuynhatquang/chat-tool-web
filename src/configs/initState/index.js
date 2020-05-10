import * as channels from './channels';
import * as threads from './threads';
import * as pendingMessages from './pendingMessages';
import * as messages from './messages';
import * as user from './user';
import * as customer from './customer';

export const initStoreState = {
  user: user.initState,
  channels: channels.initState,
  threads: threads.initState,
  messages: messages.initState,
  customer: customer.initState,
  pendingMessages: pendingMessages.initState,
};
