import { FETCH_CURRENT_USER_SUCCEED } from './actions';
import { initStoreState } from 'configs/initState';

export const userInApp = (state = initStoreState.user, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_SUCCEED:
      return action.user;
    default:
      return state;
  }
};
