import { FETCH_MESSAGES_SUCCEED, FETCH_MORE_MESSAGES_SUCCEED } from './actions';
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
        },
      };
    }
    default:
      return state;
  }
};
