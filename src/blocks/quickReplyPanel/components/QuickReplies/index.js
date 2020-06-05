import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withFetcher } from 'shared/hooks';
import { deleteQuickRepliesSucceed, fetchQuickRepliesSucceed } from './actions';
import QuickReplies from './components/QuickReplies';
import { deleteQuickReply, fetchQuickReplies } from './services';

const mapState = (state) => {
  return {
    quickRepliesFetched: storeGetter.getQuickRepliesFetched(state),
    quickReplies: storeGetter.getQuickReplies(state),
  };
};

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      fetchQuickRepliesSucceed,
      deleteQuickRepliesSucceed,
    },
    dispatch,
  );

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'quickReplies',
    async (props) => {
      if (!props.quickRepliesFetched) {
        const res = await fetchQuickReplies();
        props.fetchQuickRepliesSucceed(res);
        return res;
      }
    },
    {
      fetchOnMount: true,
    },
  ),
  withHandlers({
    deleteQuickReply: (props) => (id) => async (e) => {
      await deleteQuickReply(id);
      props.deleteQuickRepliesSucceed(id);
    },
  }),
  mapProps((props) => {
    const {
      fetchQuickRepliesSucceed,
      deleteQuickRepliesSucceed,
      quickRepliesFetched,
      quickRepliesFetcher,
      ...rest
    } = props;
    return rest;
  }),
);

export default enhance(QuickReplies);
