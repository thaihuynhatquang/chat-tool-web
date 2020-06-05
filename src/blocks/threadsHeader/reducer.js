import { initStoreState } from 'configs/initState';
import { FETCH_COUNT_STATUS_THREAD_SUCCEED } from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_COUNT_STATUS_THREAD_SUCCEED: {
      const { processing = 0, unread = 0 } = action.status;
      return {
        ...state,
        unreadThreadCount: unread,
        processingThreadCount: processing,
      };
    }
    default:
      return state;
  }
};
