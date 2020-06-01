import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { withFetcher, withLoading } from 'shared/hooks';
import { fetchChannelsSucceed, selectChannel } from './actions';
import { fetchChannels } from './services';
import * as storeGetter from 'shared/getEntities';
import Channels from './components/Channels';

const mapState = (state) => {
  const { selectedChannelId } = state;
  return {
    channels: storeGetter.getChannels(state),
    selectedChannelId,
  };
};

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      fetchChannelsSucceed,
      selectChannel,
    },
    dispatch,
  );

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
  withLoading((props) => props.channelsFetcher.isLoading && props.channelsFetcher.data === null),
  withHandlers({
    onSelectChannel: (props) => (id) => () => {
      props.selectChannel(id);
    },
  }),
  mapProps(({ channelsFetcher, fetchChannelsSucceed, selectChannel, ...rest }) => rest),
);

export default enhance(Channels);
