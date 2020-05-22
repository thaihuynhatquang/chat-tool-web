import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, withHandlers, withProps, compose } from 'recompose';
import { THREAD_STATUS_DONE } from 'common/constants';
import { MESSAGE_TYPE_TEXT, MESSAGE_TYPE_FILE } from './constants';
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
    sendMessage: (props) => async ({
      threadId = props.threadId,
      parentId = props.parentId,
      message = props.message,
    }) => {
      const identifier = moment().format('x');
      const { actions } = props;
      if (!message) return;
      try {
        actions.sendMessage({
          identifier,
          threadId,
          message,
          messageType: message ? MESSAGE_TYPE_TEXT : MESSAGE_TYPE_FILE,
          parentId,
        });
        const { response } = await services.sendMessage({
          threadId,
          message,
          parentId,
        });
        actions.sendMessageSucceed({
          identifier,
          messageId: response.messageId || response.message_id, // TODO: Remove fallback handle when server update response
        });
      } catch (err) {
        actions.sendMessageFailed({
          identifier,
          errorMessage: err.response ? err.response.data.response.message : err.message,
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
  mapProps(({ actions, threadId, threadStatus, ...rest }) => rest),
);

export default enhance(SendBox);
