import { initStoreState } from 'configs/initState';
import { unionArray } from 'shared/utils';
import {
  FETCH_MESSAGES_SUCCEED,
  FETCH_MORE_MESSAGES_SUCCEED,
  FETCH_MORE_REPLIES_SUCCEED,
  UPDATE_AVATAR_CUSTOMER_SUCCEED,
} from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case UPDATE_AVATAR_CUSTOMER_SUCCEED: {
      const { id, avatarUrl } = action.updateCustomer;

      return {
        ...state,
        entities: {
          ...state.entities,

          customers: {
            ...state.entities.customers,
            [id]: {
              ...state.entities.customers[id],
              additionData: {
                ...state.entities.customers[id].additionData,
                avatarUrl,
              },
            },
          },
        },
      };
    }
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
