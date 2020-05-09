import { FETCH_THREADS_SUCCEED, SELECT_THREAD, FETCH_MORE_THREADS_SUCCEED } from './actions';
import { unionArray } from 'shared/utils';
import { initStoreState } from 'configs/initState';
const initState = initStoreState.threads;

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_THREADS_SUCCEED:
      return {
        ...state,
        items: action.norm.result,
        itemsById: action.norm.entities.threads || {},
        totalCount: action.data.count,
      };
    case FETCH_MORE_THREADS_SUCCEED:
      return {
        ...state,
        items: unionArray([...state.items, ...action.norm.result]),
        itemsById: { ...state.itemsById, ...action.norm.entities.threads },
        totalCount: action.data.count,
      };
    case SELECT_THREAD:
      return {
        ...state,
        thread: state.itemsById[action.id],
      };
    default:
      return state;
  }
};
