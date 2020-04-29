import { compose, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFetcher, withLoading } from 'shared/hooks';
import { fetchChannelsSucceed, selectChannel } from './actions';
import { fetchChannels } from './services';
import Channels from './components/Channels';

const mapState = (state) => {
  const {
    channels: { items, itemsById, selectedChannelId },
  } = state;
  const channels = items.map((key) => itemsById[key]);
  return {
    channels,
    selectedChannelId,
  };
};

const mapDispatch = (dispatch) => {
  return bindActionCreators(
    {
      fetchChannelsSucceed,
      selectChannel,
    },
    dispatch,
  );
};

const withSelectChannel = withHandlers({
  onSelectChannel: (props) => (id) => () => {
    props.selectChannel(id);
  },
});

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'channels',
    async (props) => {
      const res = await fetchChannels();
      props.fetchChannelsSucceed(res);
      return res;
    },
    {
      fetchOnMount: true,
    },
  ),
  withLoading((props) => props.channelsFetcher.isLoading && props.channelsFetcher.data === null, { size: 3 }),
  withSelectChannel,
);

export default enhance(Channels);
