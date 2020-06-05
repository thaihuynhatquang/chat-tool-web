import { connect } from 'react-redux';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import { bindActionCreators } from 'redux';
import { addQuickRepliesSucceed } from './actions';
import QuickReplyInput from './components/QuickReplyInput';
import * as Services from './services';
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      addQuickRepliesSucceed,
    },
    dispatch,
  );

const enhance = compose(
  connect(null, mapDispatch),
  withState('isLoading', 'setIsLoading', false),
  withState('content', 'setContent', ''),
  withHandlers({
    addNewQuickReply: (props) => async (e) => {
      const content = props.content.trim();
      if (!content) return;
      props.setIsLoading(true);
      const quickReply = await Services.fetchQuickReplies({ content });
      props.setContent('');
      props.setIsLoading(false);
      props.addQuickRepliesSucceed(quickReply);
    },
    onChangeNewQuickReply: (props) => (e) => {
      const content = e.target.value;
      props.setContent(content);
    },
  }),
  mapProps((props) => {
    const { setIsLoading, setContent, ...rest } = props;
    return rest;
  }),
);
export default enhance(QuickReplyInput);
