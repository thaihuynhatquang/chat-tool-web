import { UPDATE_USER_INFO } from './actions';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        entities: {
          ...state.entities,
          users: {
            ...state.entities.users,
            ...action.norm.entities.users,
          },
        },
      };
    default:
      return state;
  }
};
