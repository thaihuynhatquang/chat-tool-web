import { initStoreState } from 'configs/initState';
import { CHANGE_FILTER_BY } from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_BY:
      return {
        ...state,
        filterThreadsBy: {
          ...state.filterThreadsBy,
          ...action.filterBy,
        },
      };
    default:
      return state;
  }
};
