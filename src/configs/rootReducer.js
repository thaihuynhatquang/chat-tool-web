import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import channels, { threadsInChannels } from 'blocks/channels/reducer';
import threads from 'blocks/threads/reducer';
import { threadsInThreadSearch } from 'blocks/threadsSearch/reducer';
import { threadsPostReducer } from './initState/threads';
import messages from 'blocks/messages/reducer';
import { pendingMessagesInSendBox } from 'blocks/messagesSendBox/reducer';
import { channelsInSocket, threadsInSocket, messagesInSocket, pendingMessagesInSocket } from 'socket/reducers';

import { initStoreState } from 'configs/initState';

export default combineReducers({
  user: () => initStoreState.user,
  channels: reduceReducers(channels, channelsInSocket, initStoreState.channels),
  threads: reduceReducers(
    threads,
    threadsInChannels,
    threadsInThreadSearch,
    threadsInSocket,
    threadsPostReducer, // NOTE: Always put this in the bottom of reducers
    initStoreState.threads,
  ),
  messages: reduceReducers(messages, messagesInSocket, initStoreState.messages),
  pendingMessages: reduceReducers(pendingMessagesInSendBox, pendingMessagesInSocket, initStoreState.pendingMessages),
});
