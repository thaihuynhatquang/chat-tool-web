import { initStoreState } from 'configs/initState';
import { THREAD_STATUS_DONE, THREAD_STATUS_PROCESSING, THREAD_STATUS_UNREAD } from 'shared/constants';
import {
  SOCKET_NEW_MESSAGE,
  SOCKET_UPDATE_THREAD,
  SOCKET_UPDATE_CHANNEL,
  SOCKET_UPDATE_THREAD_HEADER,
  SOCKET_UPDATE_CUSTOMER,
  ADD_TRANSFER_THREAD,
} from './actions';
import { unionArray } from 'shared/utils';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case SOCKET_NEW_MESSAGE: {
      const { result, entities } = action.norm;
      const addMessage = entities.messages && entities.messages[result];
      if (!addMessage || !state.selectedThreadId || addMessage.threadId !== state.selectedThreadId) {
        const filteredPendingMessages = state.pendingMessages.filter((item) => addMessage.mid !== item.messageId);
        return {
          ...state,
          pendingMessages: filteredPendingMessages,
        };
      }
      const parentMessage = addMessage.parentId ? state.entities.messages[addMessage.parentId] : null;
      const nextMessages = addMessage.parentId ? state.messages : unionArray([result, ...state.messages]);
      const nextEntitiesMessages = {
        ...state.entities.messages,
        // Should not add entity if is 2LV message and store doesn't have the parent
        ...(!addMessage.parentId || parentMessage ? entities.messages : null),
        // Check if we should update Parent Message entity in store
        ...(parentMessage
          ? parentMessage.replies
            ? {
                [addMessage.parentId]: {
                  ...parentMessage,
                  replies: {
                    ...parentMessage.replies, // Keep the next cursor if has any
                    count: parentMessage.replies.count + 1,
                    data: [result, ...parentMessage.replies.data],
                  },
                },
              }
            : {
                [addMessage.parentId]: {
                  ...parentMessage,
                  replies: {
                    count: 1,
                    data: [result],
                  },
                },
              }
          : null),
      };
      return {
        ...state,
        messages: nextMessages,
        pendingMessages: state.pendingMessages
          .filter((item) => item.messageId !== result)
          .filter((item) => item.message && item.message.trim() !== addMessage.content.trim()),
        entities: {
          ...state.entities,
          messages: nextEntitiesMessages,
          customers: {
            ...state.entities.customers,
            ...entities.customers,
          },
          users: {
            ...state.entities.users,
            ...entities.users,
          },
        },
      };
    }
    case SOCKET_UPDATE_THREAD: {
      const { result, entities } = action.norm;
      const addThread = entities.threads && entities.threads[result];

      // Only add thread to store if thread should be shown
      if (!addThread || (addThread.id !== state.selectedThreadId && addThread.channelId !== state.selectedChannelId)) {
        return state;
      }
      const isInCurrentChannel = addThread.channelId === state.selectedChannelId;

      const currentThreadUpdated = result === state.selectedThreadId;
      const currentThreadMoveToDone = currentThreadUpdated && addThread.status === THREAD_STATUS_DONE;

      return {
        ...state,
        selectedThreadId: currentThreadMoveToDone ? null : state.selectedThreadId,
        customerId: currentThreadMoveToDone ? null : state.customerId,
        totalThreadsCount: state.threads.includes(result) ? state.totalThreadsCount : state.totalThreadsCount + 1,
        threads: isInCurrentChannel ? unionArray([...state.threads, result]) : state.threads,
        entities: {
          ...state.entities,
          threads: {
            ...state.entities.threads,
            ...entities.threads,
          },
        },
      };
    }
    case SOCKET_UPDATE_CHANNEL: {
      if (!state.entities.channels[action.channel.id]) return state;

      return {
        ...state,
        entities: {
          ...state.entities,
          channels: {
            ...state.entities.channels,
            [action.channel.id]: {
              ...state.entities.channels[action.channel.id],
              missCount: state.entities.channels[action.channel.id].missCount + action.channel.missCountChange,
            },
          },
        },
      };
    }

    case SOCKET_UPDATE_CUSTOMER: {
      const { entities } = action.norm;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            ...entities.customers,
          },
        },
      };
    }

    case SOCKET_UPDATE_THREAD_HEADER: {
      const { referentData } = action;

      if (referentData.nStatus === referentData.oStatus) {
        return state;
      } else if (referentData.nStatus === THREAD_STATUS_PROCESSING && referentData.oStatus === THREAD_STATUS_UNREAD) {
        return {
          ...state,
          processingThreadCount: state.processingThreadCount + 1,
          unreadThreadCount: state.unreadThreadCount - 1,
        };
      } else if (referentData.nStatus === THREAD_STATUS_UNREAD && referentData.oStatus === THREAD_STATUS_PROCESSING) {
        return {
          ...state,
          unreadThreadCount: state.unreadThreadCount + 1,
          processingThreadCount: state.processingThreadCount - 1,
        };
      } else if (referentData.nStatus === THREAD_STATUS_PROCESSING && referentData.oStatus !== THREAD_STATUS_UNREAD) {
        return {
          ...state,
          processingThreadCount: state.processingThreadCount + 1,
        };
      } else if (referentData.nStatus === THREAD_STATUS_UNREAD && referentData.oStatus !== THREAD_STATUS_PROCESSING) {
        return {
          ...state,
          unreadThreadCount: state.unreadThreadCount + 1,
        };
      } else if (referentData.nStatus !== THREAD_STATUS_UNREAD && referentData.oStatus === THREAD_STATUS_PROCESSING) {
        return {
          ...state,
          processingThreadCount: state.processingThreadCount - 1,
        };
      } else if (referentData.nStatus !== THREAD_STATUS_PROCESSING && referentData.oStatus === THREAD_STATUS_UNREAD) {
        return {
          ...state,
          unreadThreadCount: state.unreadThreadCount - 1,
        };
      }
      return state;
    }

    case ADD_TRANSFER_THREAD: {
      if (state.transferThreads.find((transfer) => transfer.id === action.receiveTransferThread.id)) {
        return state;
      }
      return {
        ...state,
        transferThreads: [...state.transferThreads, action.receiveTransferThread],
      };
    }

    default:
      return state;
  }
};
