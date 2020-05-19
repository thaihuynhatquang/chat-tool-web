import { FETCH_CURRENT_USER_SUCCEED } from './actions';

import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_SUCCEED: {
      const { user } = action;
      return {
        ...state,
        userId: user.id,
        entities: {
          ...state.entities,
          users: {
            ...state.entities.users,
            [user.id]: user,
          },
        },
      };
    }
    default:
      return state;
  }
};
