import { initStoreState } from 'configs/initState';
import { SEND_MESSAGE, SEND_MESSAGE_SUCCEED, SEND_MESSAGE_FAILED } from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const { type, ...rest } = action;
      return {
        ...state,
        // $FlowFixMe
        pendingMessages: [...state.pendingMessages, rest],
      };
    }
    case SEND_MESSAGE_SUCCEED: {
      const { identifier, messageId } = action;
      return {
        ...state,
        pendingMessages: state.pendingMessages.map((item) => {
          if (item.identifier !== identifier) return item;
          return { ...item, messageId };
        }),
      };
    }
    case SEND_MESSAGE_FAILED: {
      const { identifier, errorMessage } = action;
      return {
        ...state,
        pendingMessages: state.pendingMessages.map((item) => {
          if (item.identifier !== identifier) return item;
          return { ...item, errorMessage };
        }),
      };
    }
    default:
      return state;
  }
};
