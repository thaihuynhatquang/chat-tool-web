import { compose, withProps, withHandlers, withState } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFetcher, withLoading, withInfiniteScroll, withEmpty } from 'shared/hooks';
import Threads from './components/Threads';
import { fetchThreadsSucceed, selectThread, fetchMoreThreadsSucceed, fetchMoreThreadsError } from './actions';
import { fetchThreadsByChannelId } from './services';

const PAGING_LIMIT_THREADS = 20;

const mapState = (state) => {
  const {
    threads: { items, itemsById, thread, filterBy, totalCount },
  } = state;
  const threads = items.map((key) => itemsById[key]);
  return {
    threads,
    selectedThreadId: thread && thread.id,
    filterBy,
    totalCount,
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

const withSelectThread = withHandlers({
  onSelectThread: (props) => (id) => () => {
    props.selectThread(id);
  },
});

const withFetcherAPI = withFetcher(
  'threads',
  async (props) => {
    const {
      filterBy: { sort, ...otherFilter },
    } = props;
    const input = {
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
    fetchOnPropsChange: ['filterBy'],
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
  withSelectThread,
  withEmpty((props) => props.threads.length === 0),
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
        filterBy: { sort, ...otherFilter },
      } = props;
      const input = {
        limit: props.limit,
        nextCursor: props.nextCursor,
        ...otherFilter,
        ...(sort && {
          sort: [['updatedAt', sort]],
        }),
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
