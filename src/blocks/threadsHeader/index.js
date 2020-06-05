import { changeFilterBy } from 'blocks/threadsSearch/actions';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { withFetcher } from 'shared/hooks';
import { changeStatusTheadCount } from './actions';
import ThreadHeader from './components/ThreadHeader';
import { fetchStatusThreadsCount } from './services';

const mapState = (state) => {
  const {
    filterThreadsBy,
    selectedChannelId,
    unreadThreadCount: unreadCount,
    processingThreadCount: processingCount,
  } = state;

  return {
    channelId: selectedChannelId,
    unreadCount,
    processingCount,
    currentFilterStatus: filterThreadsBy.status,
  };
};

const mapDispatch = (dispatch) => bindActionCreators({ changeFilterBy, changeStatusTheadCount }, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'statusThreadsCount',
    async (props) => {
      if (!props.channelId) return;
      const { status } = await fetchStatusThreadsCount({
        channelId: props.channelId,
      });
      props.changeStatusTheadCount(status);
    },
    {
      fetchOnMount: true,
      fetchOnPropsChange: ['channelId'],
    },
  ),
  withHandlers({
    changeFilterStatus: (props) => (status) => () => {
      props.changeFilterBy({ status });
    },
  }),
  mapProps(({ changeFilterBy, ...rest }) => rest),
);
export default enhance(ThreadHeader);
