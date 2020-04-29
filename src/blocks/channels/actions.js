export const FETCH_CHANNELS_SUCCEED = 'FETCH_CHANNELS_SUCCEED';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';

export const fetchChannelsSucceed = ({ data, norm }) => ({
  type: FETCH_CHANNELS_SUCCEED,
  data,
  norm,
});

export const selectChannel = (id) => ({
  type: SELECT_CHANNEL,
  id,
});
