import { FETCH_CHANNELS_SUCCEED, SELECT_CHANNEL } from './actions';

import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS_SUCCEED: {
      const { result, entities } = action.norm;
      return {
        ...state,
        channels: result,
        entities: {
          ...state.entities,
          channels: {
            ...state.entities.channels,
            ...entities.channels,
          },
        },
      };
    }
    case SELECT_CHANNEL:
      return {
        ...state,
        selectedChannelId: action.id,
      };
    default:
      return state;
  }
};
