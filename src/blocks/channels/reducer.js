import { FETCH_CHANNELS_SUCCEED, SELECT_CHANNEL } from './actions';

const initState = {
  items: [],
  itemsById: {},
  totalCount: 0,
  selectedChannelId: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS_SUCCEED:
      return {
        ...state,
        items: action.norm.result,
        itemsById: action.norm.entities.channels || {},
        totalCount: action.data.count,
      };
    case SELECT_CHANNEL:
      return {
        ...state,
        selectedChannelId: action.id,
      };
    default:
      return state;
  }
};
