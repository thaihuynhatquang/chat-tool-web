import { CHANNEL_CONFIG_GENERAL_SETTINGS } from 'shared/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, mapProps, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withFetcher, withLoading } from 'shared/hooks';
import * as actions from './actions';
import Channels from './components/Channels';
import * as services from './services';
import { client } from 'configs/axios';

const mapState = (state) => {
  const { selectedChannelId } = state;
  return {
    channels: storeGetter.getChannels(state),
    selectedChannelId,
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'user',
    async (props) => {
      try {
        const { data: userInfo } = await client.get('/api/v1/users/me');
        props.fetchCurrentUserSucceed(userInfo);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log(err);
        }
      }
    },
    { fetchOnMount: true },
  ),
  withFetcher(
    'channels',
    async (props) => {
      const res = await services.fetchChannels();
      props.fetchChannelsSucceed(res);
      return res;
    },
    {
      fetchOnMount: true,
    },
  ),
  withLoading((props) => props.channelsFetcher.isLoading && props.channelsFetcher.data === null),
  withRouter,
  withHandlers({
    onSelectChannel: (props) => (id) => () => {
      props.selectChannel(id);
    },
    onClickManageChannel: (props) => (id) => () => {
      props.history.push(`/channel/${id}/${CHANNEL_CONFIG_GENERAL_SETTINGS}`);
    },
    updateUserConfigsOfChannel: (props) => (channelId) => (configs) => () => {
      services.updateUserConfigsOfChannel({ configs, channelId }).then(() => {
        props.updateUserConfigsOfChannel({ configs, channelId });
      });
    },
  }),
  mapProps(({ channelsFetcher, fetchChannelsSucceed, fetchCurrentUserSucceed, selectChannel, ...rest }) => rest),
);

export default enhance(Channels);
