import { initStoreState } from 'configs/initState';
import {
  FETCH_CURRENT_USER_SUCCEED,
  FETCH_ROLE_SUCCEED,
  REMOVE_SELECTED_CHANNEL_ID,
  REMOVE_SELECTED_THREAD_ID,
} from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_SUCCEED: {
      const { user } = action;
      return {
        ...state,
        transferThreads: user.receiveTransferThreads || [],
        userId: user.id,
        entities: {
          ...state.entities,
          users: {
            ...state.entities.users,
            [user.id]: user,
          },
        },
      };
    }
    case FETCH_ROLE_SUCCEED: {
      const { roles } = action;
      return {
        ...state,
        entities: {
          ...state.entities,
          roles,
        },
      };
    }
    case REMOVE_SELECTED_CHANNEL_ID:
      return {
        ...state,
        selectedChannelId: null,
        selectedThreadId: null,
      };
    case REMOVE_SELECTED_THREAD_ID:
      return {
        ...state,
        selectedThreadId: null,
      };
    default:
      return state;
  }
};
