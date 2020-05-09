import { initStoreState } from 'configs/initState';
import { SEND_MESSAGE, SEND_MESSAGE_SUCCEED, SEND_MESSAGE_FAILED } from './actions';

export const pendingMessagesInSendBox = (state = initStoreState.pendingMessages, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const { identifier } = action;
      const { type, ...rest } = action;
      return {
        ...state,
        items: [...state.items, identifier],
        itemsById: {
          ...state.itemsById,
          [identifier]: {
            ...rest,
          },
        },
      };
    }
    case SEND_MESSAGE_SUCCEED: {
      const { identifier, messageId } = action;
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [identifier]: {
            ...state.itemsById[identifier],
            messageId,
          },
        },
      };
    }
    case SEND_MESSAGE_FAILED: {
      const { identifier, errorMessage } = action;
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [identifier]: {
            ...state.itemsById[identifier],
            errorMessage,
          },
        },
      };
    }
    default:
      return state;
  }
};
