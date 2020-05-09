import * as channels from './channels';
import * as threads from './threads';
import * as pendingMessages from './pendingMessages';
import * as messages from './messages';
import * as user from './user';

export const initStoreState = {
  user: user.initState,
  channels: channels.initState,
  threads: threads.initState,
  messages: messages.initState,
  pendingMessages: pendingMessages.initState,
};
