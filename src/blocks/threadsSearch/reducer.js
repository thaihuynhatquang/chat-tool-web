import { CHANGE_FILTER_BY } from './actions';
import { initStoreState } from 'configs/initState';

const initState = initStoreState.threads;

export const threadsInThreadSearch = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_BY:
      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          ...action.filterBy,
        },
      };
    default:
      return state;
  }
};
