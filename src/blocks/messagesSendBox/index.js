import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, withHandlers, withProps, withStateHandlers, compose } from 'recompose';
import { THREAD_STATUS_DONE } from 'common/constants';
import { MESSAGE_TYPE_TEXT, MESSAGE_TYPE_FILE } from './constants';
import SendBox from './components/SendBox';
import * as actions from './actions';
import * as services from './services';
import moment from 'moment';

const mapState = (state) => {
  const {
    threads: { thread },
  } = state;
  return {
    selectedThreadId: thread && thread.id,
    selectedThreadStatus: thread && thread.status,
  };
};
const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.selectedThreadId, renderNothing),
  withProps((props) => ({
    disabled: props.selectedThreadStatus === THREAD_STATUS_DONE,
  })),
  withStateHandlers(
    {
      isShowEmoji: false,
    },
    {
      toggleEmoji: ({ isShowEmoji }) => () => ({
        isShowEmoji: !isShowEmoji,
      }),
      hideEmoji: () => () => ({
        isShowEmoji: false,
      }),
    },
  ),
  withStateHandlers(
    { message: '' },
    {
      onMessageChange: ({ message }) => (e) => ({ message: e.target.value }),
      onSelectEmoji: ({ message }) => (emoji) => ({
        message: message + emoji.native,
      }),
      resetMessage: () => () => ({ message: '' }),
    },
  ),
  withHandlers({
    resetSendBox: (props) => () => {
      props.hideEmoji();
      props.resetMessage();
    },
  }),
  withHandlers({
    sendMessage: (props) => async () => {
      const identifier = moment().format('x');
      const { actions, selectedThreadId, message, resetSendBox } = props;
      if (!message) return;
      resetSendBox();
      try {
        actions.sendMessage({
          identifier,
          threadId: selectedThreadId,
          message,
          messageType: message ? MESSAGE_TYPE_TEXT : MESSAGE_TYPE_FILE,
        });
        const { response } = await services.sendMessage({
          threadId: selectedThreadId,
          message,
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
  mapProps(
    ({ actions, hideEmoji, resetSendBox, resetMessage, selectedThreadId, selectedThreadStatus, ...rest }) => rest,
  ),
);

export default enhance(SendBox);
