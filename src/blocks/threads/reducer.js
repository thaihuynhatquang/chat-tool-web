import { FETCH_THREADS_SUCCEED, FETCH_MORE_THREADS_SUCCEED, SELECT_THREAD } from './actions';
import { unionArray } from 'shared/utils';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_THREADS_SUCCEED: {
      const { result, entities } = action.norm;
      return {
        ...state,
        threads: result,
        entities: {
          ...state.entities,
          threads:
            !state.selectedThreadId || result.includes(state.selectedThreadId)
              ? entities.threads || {}
              : {
                  ...entities.threads,
                  [state.selectedThreadId]: state.entities.threads[state.selectedThreadId],
                },
        },
        totalThreadsCount: action.data.count,
      };
    }
    case FETCH_MORE_THREADS_SUCCEED: {
      const { result, entities } = action.norm;
      return {
        ...state,
        threads: unionArray([...state.threads, ...result]),
        entities: {
          ...state.entities,
          threads: {
            ...state.entities.threads,
            ...entities.threads,
          },
        },
        totalCount: action.data.count,
      };
    }
    case SELECT_THREAD: {
      const { [state.customerId || 0]: _omit, ...nextCustomersEntities } = state.entities.customers;
      return {
        ...state,
        selectedThreadId: action.id,
        messages: [],
        customerId: null,
        entities: {
          ...state.entities,
          customers: nextCustomersEntities,
        },
      };
    }
    default:
      return state;
  }
};
