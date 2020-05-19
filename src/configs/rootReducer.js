import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import channels, { threadsInChannels } from 'blocks/channels/reducer';
import threads, { messagesInThreads, customerInThreads } from 'blocks/threads/reducer';
import { threadsInThreadSearch } from 'blocks/threadsSearch/reducer';
import { threadsPostReducer } from './initState/threads';
import messages from 'blocks/messages/reducer';
import customer from 'blocks/customersInfo/customer/reducer';
import { customerInTags } from 'blocks/customersInfo/tags/reducer';
import { customerInNotes } from 'blocks/customersInfo/notes/reducer';
import { pendingMessagesInSendBox } from 'blocks/messagesSendBox/reducer';
import { userInApp } from 'blocks/app/reducer';
import { channelsInSocket, threadsInSocket, messagesInSocket, pendingMessagesInSocket } from 'socket/reducers';

import { initStoreState } from 'configs/initState';

export default combineReducers({
  user: userInApp,
  channels: reduceReducers(channels, channelsInSocket, initStoreState.channels),
  threads: reduceReducers(
    threads,
    threadsInChannels,
    threadsInThreadSearch,
    threadsInSocket,
    threadsPostReducer, // NOTE: Always put this in the bottom of reducers
    initStoreState.threads,
  ),
  messages: reduceReducers(messages, messagesInThreads, messagesInSocket, initStoreState.messages),
  customer: reduceReducers(customer, customerInThreads, customerInTags, customerInNotes, initStoreState.customer),
  pendingMessages: reduceReducers(pendingMessagesInSendBox, pendingMessagesInSocket, initStoreState.pendingMessages),
});
