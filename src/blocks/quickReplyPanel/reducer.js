import { initStoreState } from 'configs/initState';
import { DELETE_QUICKREPLIES_SUCCEED, FETCH_QUICKREPLIES_SUCCEED } from './components/QuickReplies/actions';
import { ADD_QUICKREPLIES_SUCCEED } from './components/QuickReplyInput/actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_QUICKREPLIES_SUCCEED: {
      const { entities } = action.norm;
      return {
        ...state,
        quickRepliesFetched: true,
        entities: {
          ...state.entities,
          quickReplies: {
            ...state.entities.quickReplies,
            ...entities.quickReplies,
          },
        },
      };
    }
    case DELETE_QUICKREPLIES_SUCCEED: {
      const { [`${action.id}`]: remove, ...newFilter } = state.entities.quickReplies;
      return {
        ...state,
        entities: {
          ...state.entities,
          quickReplies: newFilter,
        },
      };
    }
    case ADD_QUICKREPLIES_SUCCEED: {
      const quickReply = action.quickReply;
      return {
        ...state,
        entities: {
          ...state.entities,
          quickReplies: {
            ...state.entities.quickReplies,
            [quickReply.id]: quickReply,
          },
        },
      };
    }

    default:
      return state;
  }
};
