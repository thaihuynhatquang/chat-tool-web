export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const FETCH_CHANNELS_SUCCEED = 'FETCH_CHANNELS_SUCCEED';
export const UPDATE_USER_CONFIGS_OF_CHANNEL = 'UPDATE_USER_CONFIGS_OF_CHANNEL';

export const fetchChannelsSucceed = ({ data, norm }) => ({
  type: FETCH_CHANNELS_SUCCEED,
  data,
  norm,
});

export const selectChannel = (id) => ({
  type: SELECT_CHANNEL,
  id,
});

export const updateUserConfigsOfChannel = ({ channelId, configs }) => ({
  type: UPDATE_USER_CONFIGS_OF_CHANNEL,
  channelId,
  configs,
});
