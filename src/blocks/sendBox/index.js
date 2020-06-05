import { THREAD_STATUS_DONE, THREAD_STATUS_UNREAD } from 'shared/constants';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  branch,
  compose,
  mapProps,
  renderComponent,
  renderNothing,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import * as actions from './actions';
import LayoutSendBox from './components/LayoutSendBox';
import SendBoxDisabled from './components/SendBoxDisabled';
import { DEFAULT_SENDBOX_HEIGHT } from './constants';
import * as services from './services';

const mapState = (state) => {
  const { selectedThreadId } = state;
  const thread = storeGetter.getSelectedThread(state);
  const channel = thread ? storeGetter.getChannelById(state, thread.channelId) : null;
  return {
    threadId: selectedThreadId,
    threadStatus: thread && thread.status,
    channelDisableSendBoxInUnread: channel && channel.configs && channel.configs.disableSendBoxInUnread,
  };
};
const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const getHeightFromSize = (size) => {
  if (size === 'md') {
    return DEFAULT_SENDBOX_HEIGHT;
  }

  return DEFAULT_SENDBOX_HEIGHT / 2;
};

const enhance = compose(
  connect(mapState, mapDispatch),
  // getHeightFromSize
  withProps((props) => {
    if (props.height) {
      return {};
    }

    if (props.size) {
      return {
        height: getHeightFromSize(props.size),
      };
    }

    return {
      size: 'md',
      height: getHeightFromSize('md'),
    };
  }),
  branch((props) => !props.threadId, renderNothing),
  // render disable
  branch(
    (props) =>
      props.threadStatus === THREAD_STATUS_DONE ||
      (props.threadStatus === THREAD_STATUS_UNREAD && props.channelDisableSendBoxInUnread),
    renderComponent(SendBoxDisabled),
  ),

  // create state for attachment handler
  withStateHandlers(
    { message: '', attachment: undefined }, // TODO: Support multiple attachments send
    {
      onAttachmentChange: (state) => (e) => ({
        attachment: e.target.files[0],
      }),
      onAttachmentDrop: (state) => (file) => ({
        attachment: file,
      }),
      onMessageChange: ({ message }) => (value) => ({ message: value }),
      onSelectEmoji: ({ message }) => (emoji) => ({
        message: message + emoji.native,
      }),
      resetMessage: () => () => ({ message: '' }),
      resetAttachment: () => () => ({ attachment: undefined }),
    },
  ),

  // create state for emoji handler
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

  // handler send messsage
  withHandlers({
    sendMessage: (props) => async () => {
      const { threadId, message, attachment, parentId } = props;

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
          messageId: response.message_id,
        });
      } catch (err) {
        actions.sendMessageFailed({
          identifier,
          errorMessage: typeof err.response.data === 'string' ? err.message : err.response.data.response.message,
        });
      }
    },
    resetSendBox: (props) => () => {
      props.hideEmoji();
      props.resetMessage();
      props.resetAttachment();
    },
  }),

  withHandlers({
    sendAndResetBox: (props) => () => {
      props.sendMessage();
      props.resetSendBox();
    },
  }),

  mapProps(({ actions, threadId, threadStatus, ...rest }) => rest),
);

export default enhance(LayoutSendBox);
