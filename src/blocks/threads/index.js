import { updateThreadStatus } from 'blocks/messagesHeader/services';
import { THREAD_STATUS_DONE } from 'shared/constants';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps, withState } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withEmpty, withFetcher, withInfiniteScroll, withLoading } from 'shared/hooks';
import { fetchMoreThreadsError, fetchMoreThreadsSucceed, fetchThreadsSucceed, selectThread } from './actions';
import Threads from './components/Threads';
import { fetchThreadsByChannelId, setProcessedThread } from './services';

const PAGING_LIMIT_THREADS = 20;

const mapState = (state) => {
  const { totalThreadsCount, filterThreadsBy, selectedThreadId, selectedChannelId } = state;
  return {
    threads: storeGetter.getThreads(state),
    selectedChannelId,
    selectedThreadId,
    filterBy: filterThreadsBy,
    totalCount: totalThreadsCount,
  };
};

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      fetchThreadsSucceed,
      selectThread,
      fetchMoreThreadsSucceed,
      fetchMoreThreadsError,
    },
    dispatch,
  );

const withFetcherAPI = withFetcher(
  'threads',
  async (props) => {
    const {
      selectedChannelId,
      filterBy: { sort, ...otherFilter },
    } = props;
    if (!selectedChannelId) return;
    const input = {
      channelId: selectedChannelId,
      limit: props.limit,
      ...otherFilter,
      ...(sort && {
        sort: [['updatedAt', sort]],
      }),
    };
    const res = await fetchThreadsByChannelId(input);
    props.fetchThreadsSucceed(res);
    props.setNextCursor(res.data.nextCursor);
    return res;
  },
  {
    fetchOnMount: true,
    fetchOnPropsChange: ['selectedChannelId', 'filterBy'],
  },
);

const withLoadingAPI = withLoading((props) => props.threadsFetcher.isLoading, {
  centerVertical: true,
});

const isBottom = (el) => {
  if (!el) return false;
  const { scrollTop, clientHeight, scrollHeight } = el;
  return scrollTop + clientHeight >= scrollHeight - 20;
};

const CONTAINER_ID = 'threadlist';

const enhance = compose(
  withProps((props) => ({
    limit: PAGING_LIMIT_THREADS,
  })),
  withState('nextCursor', 'setNextCursor', ''),
  connect(mapState, mapDispatch),
  withFetcherAPI,
  withLoadingAPI,
  withEmpty((props) => props.threads.length === 0),
  withHandlers({
    onSelectThread: (props) => (id) => () => {
      props.selectThread(id);
    },
    onCloseThread: (props) => (threadId) => ({ cause }) => (e) => {
      e.stopPropagation();
      return updateThreadStatus({
        threadId,
        status: THREAD_STATUS_DONE,
        cause,
      });
    },
    onProcessThread: (props) => (threadId) => async (e) => {
      e.stopPropagation();
      setProcessedThread({
        threadId,
      });
    },
  }),
  // Scroll event
  withInfiniteScroll(
    CONTAINER_ID,
    (props) => {
      const wrappedElement = document.getElementById(CONTAINER_ID);
      return isBottom(wrappedElement);
    },
    (props) => !!props.nextCursor && props.threads.length !== props.totalCount,
    async (props) => {
      const {
        selectedChannelId,
        filterBy: { sort, ...otherFilter },
      } = props;
      const input = {
        channelId: selectedChannelId,
        limit: props.limit,
        ...otherFilter,
        ...(sort && {
          sort: [['updatedAt', sort]],
        }),
        nextCursor: props.nextCursor,
      };

      const res = await fetchThreadsByChannelId(input);
      props.setNextCursor(res.data.nextCursor);
      return res;
    },
    (props) => (res) => {
      props.fetchMoreThreadsSucceed(res);
      return res;
    },
    (props) => (error) => {
      props.fetchMoreThreadsError(error);
    },
  ),
);

export default enhance(Threads);
