import { initStoreState } from 'configs/initState';
import { FETCH_CHANNELS_SUCCEED, SELECT_CHANNEL, UPDATE_USER_CONFIGS_OF_CHANNEL } from './actions';

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
    case UPDATE_USER_CONFIGS_OF_CHANNEL: {
      const { channelId } = action;
      return {
        ...state,
        entities: {
          ...state.entities,
          channels: {
            ...state.entities.channels,
            [channelId]: {
              ...state.entities.channels[channelId],
              'ChannelUser.configs': {
                ...state.entities.channels[channelId]['ChannelUser.configs'],
                ...action.configs,
              },
            },
          },
        },
      };
    }
    default:
      return state;
  }
};
