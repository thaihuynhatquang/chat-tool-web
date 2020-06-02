import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, withHandlers, withProps, compose } from 'recompose';
import { THREAD_STATUS_DONE } from 'common/constants';
import SendBox from './components/SendBox';
import * as actions from './actions';
import * as services from './services';
import * as storeGetter from 'shared/getEntities';
import moment from 'moment';

const mapState = (state) => {
  const { selectedThreadId } = state;
  const thread = storeGetter.getSelectedThread(state);
  return {
    threadId: selectedThreadId,
    threadStatus: thread && thread.status,
  };
};
const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export const withSendMessage = compose(
  connect(null, mapDispatch),
  withHandlers({
    _sendMessage: (props) => (parentId) => async ({ message, attachment }) => {
      const { threadId } = props;
      if (!threadId) throw new Error('Send message without threadId');
      const identifier = moment().format('x');
      const { actions } = props;
      if (!message && !attachment) return;
      try {
        actions.sendMessage({
          identifier,
          threadId,
          parentId,
          message,
          attachment,
        });
        const { response } = await services.sendMessage({
          threadId,
          parentId,
          message,
          attachment,
        });
        actions.sendMessageSucceed({
          identifier,
          messageId: response.messageId || response.message_id, // TODO: Remove fallback handle when server update response
        });
      } catch (err) {
        actions.sendMessageFailed({
          identifier,
          errorMessage: typeof err.response.data === 'string' ? err.message : err.response.data.response.message,
        });
      }
    },
  }),
  mapProps(({ actions, ...rest }) => rest),
);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.threadId, renderNothing),
  withProps((props) => ({
    disabled: props.threadStatus === THREAD_STATUS_DONE,
  })),
  withSendMessage,
  withHandlers({
    sendMessage: (props) => props._sendMessage(),
  }),
  mapProps(({ actions, threadId, threadStatus, _sendMessage, ...rest }) => rest),
);

export default enhance(SendBox);
