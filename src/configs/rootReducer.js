import reduceReducers from 'reduce-reducers';
import channels from 'blocks/channels/reducer';
import threads, { threadsPostReducer } from 'blocks/threads/reducer';
import threadsSearch from 'blocks/threadsSearch/reducer';
import messages from 'blocks/messages/reducer';
import customer from 'blocks/customersInfo/customer/reducer';
import customerNotes from 'blocks/customersInfo/notes/reducer';
import customerTags from 'blocks/customersInfo/tags/reducer';
import pendingMessages from 'blocks/sendBox/reducer';
import user from 'blocks/user/reducer';
import app from 'blocks/app/reducer';
import quickReplies from 'blocks/quickReplyPanel/reducer';
import socket from 'socket/reducers';
import threadsHeader from 'blocks/threadsHeader/reducer';

import { initStoreState } from 'configs/initState';

export default reduceReducers(
  channels,
  threads,
  threadsSearch,
  messages,
  customer,
  customerTags,
  customerNotes,
  pendingMessages,
  user,
  app,
  socket,
  threadsPostReducer,
  quickReplies,
  threadsHeader,
  initStoreState,
);
