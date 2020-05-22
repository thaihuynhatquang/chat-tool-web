import { FETCH_MESSAGES_SUCCEED, FETCH_MORE_MESSAGES_SUCCEED, FETCH_MORE_REPLIES_SUCCEED } from './actions';
import { unionArray } from 'shared/utils';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCEED: {
      const { entities, result } = action.norm;
      return {
        ...state,
        messages: result,
        entities: {
          ...state.entities,
          messages: entities.messages || {},
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
    case FETCH_MORE_MESSAGES_SUCCEED: {
      const { entities, result } = action.norm;
      return {
        ...state,
        messages: unionArray([...state.messages, ...result]),
        entities: {
          ...state.entities,
          messages: {
            ...state.entities.messages,
            ...entities.messages,
          },
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
    case FETCH_MORE_REPLIES_SUCCEED: {
      const { data, norm, parentId } = action;
      const { entities, result } = norm;
      return {
        ...state,
        entities: {
          ...state.entities,
          messages: {
            ...state.entities.messages,
            ...entities.messages,
            [parentId]: {
              ...state.entities.messages[parentId],
              replies: {
                count: data.count,
                nextCursor: data.nextCursor,
                data: [
                  ...((state.entities.messages[parentId].replies && state.entities.messages[parentId].replies.data) ||
                    []),
                  ...result,
                ],
              },
            },
          },
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
    default:
      return state;
  }
};
