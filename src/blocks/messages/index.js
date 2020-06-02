import React from 'react';
import Messages from './components/Messages';
import { branch, lifecycle, mapProps, renderNothing, withHandlers, withProps, withState, compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { withFetcher, withScroll } from 'shared/hooks';
import { SEND_STATUS_PENDING, SEND_STATUS_ARRIVED, SEND_STATUS_COMPLETED, FETCH_REPLIES_LIMIT } from './constants';
import { withSendMessage } from 'blocks/messagesSendBox';
import * as actions from './actions';
import * as services from './services';
import * as storeGetter from 'shared/getEntities';

const mapState = (state) => {
  const { pendingMessages } = state;
  const user = storeGetter.getUser(state);
  const thread = storeGetter.getSelectedThread(state);
  const channel = storeGetter.getChannelById(state, thread && thread.channelId);
  const messageLevel = storeGetter.getChannelMessageLevel(channel);
  const readAtValue = thread && thread.readAt;

  const formattedPendingMessages = pendingMessages
    .filter((item) => thread && item.threadId === thread.id)
    .map((item) => {
      const { identifier, threadId, parentId, message, attachment, messageId, errorMessage } = item;
      const createdAt = moment(identifier, 'x');
      return {
        mid: identifier,
        threadId,
        parentId,
        customer: null,
        content: message,
        additionData: attachment
          ? {
              attachments: [
                {
                  type: 'image',
                  payload: {
                    url: URL.createObjectURL(attachment),
                  },
                },
              ],
            }
          : null,
        sendingStatus: !messageId ? SEND_STATUS_PENDING : SEND_STATUS_ARRIVED,
        isVerified: true,
        user,
        userId: user && user.id,
        errorMessage,
        msgCreatedAt: createdAt,
        msgUpdatedAt: createdAt,
      };
    });
  const messages = storeGetter.getMessages(state).map((item) => ({
    ...item,
    sendingStatus:
      item.isVerified && readAtValue ? (item.msgCreatedAt > readAtValue ? SEND_STATUS_COMPLETED : null) : null,
    replies: item.replies
      ? {
          ...item.replies,
          data: [
            ...formattedPendingMessages.filter((_item) => _item.parentId === item.mid).reverse(),
            ...((item.replies && item.replies.data) || []),
          ],
        }
      : null,
  }));
  // Create merge messages. NOTE: Array in latest-message-first order.
  const mergeMessages = [...[...formattedPendingMessages.filter((item) => !item.parentId)].reverse(), ...messages];
  const lastMessage = mergeMessages.length > 0 ? mergeMessages[0] : null;
  return {
    messageLevel,
    messages: mergeMessages,
    threadId: thread && thread.id,
    readAt: thread && lastMessage && lastMessage.msgCreatedAt <= thread.readAt && thread.readAt,
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.threadId, renderNothing),
  withState('nextCursor', 'setNextCursor', ''),
  withFetcher(
    'messages',
    async (props) => {
      const { fetchMessagesSucceed, threadId, setNextCursor } = props;
      const res = await services.fetchMessages({ threadId });
      setNextCursor(res.data.nextCursor);
      fetchMessagesSucceed(res);
    },
    {
      fetchOnMount: true,
      fetchOnPropsChange: ['threadId'],
    },
  ),
  withProps({ mountRef: React.createRef() }),
  withHandlers({
    scrollToBottom: (props) => () => {
      const { mountRef } = props;
      const node = mountRef && mountRef.current;
      if (node) {
        setTimeout(() => {
          node.scrollTop = node.scrollHeight;
        }, 1);
      }
    },
    loadMoreReplies: (props) => ({ nextCursor, messageId }) => async () => {
      const { threadId } = props;
      const res = await services.fetchMessages({
        nextCursor,
        threadId,
        parentId: messageId,
        limit: FETCH_REPLIES_LIMIT,
      });
      props.fetchMoreRepliesSucceed({ ...res, parentId: messageId });
    },
  }),
  withSendMessage,
  withHandlers({
    sendMessage: (props) => props._sendMessage(),
    replyMessage: (props) => (parentId) => props._sendMessage(parentId),
  }),
  lifecycle({
    componentDidMount() {
      this.props.scrollToBottom();
    },
    componentDidUpdate(prevProps) {
      const { threadId, messages, readAt, scrollToBottom } = this.props;

      if (
        prevProps.threadId !== threadId ||
        prevProps.readAt !== readAt ||
        (prevProps.messages.length < messages.length && prevProps.messages.length === 0) ||
        (prevProps.messages.length > 0 && messages.length > 0 && prevProps.messages[0].mid !== messages[0].mid) // TODO: only scroll down if the scroll is bottom
      ) {
        scrollToBottom();
      }
    },
  }),
  withScroll({
    refPropName: 'mountRef',
    onScrollTop: async (props) => {
      const { fetchMoreMessagesSucceed, threadId, nextCursor, setNextCursor } = props;
      if (!nextCursor) {
        return;
      }
      const res = await services.fetchMessages({
        threadId,
        nextCursor: props.nextCursor,
      });
      setNextCursor(res.data.nextCursor);
      fetchMoreMessagesSucceed(res);
    },
  }),
  mapProps(
    ({
      fetchMessages,
      fetchMessagesSucceed,
      fetchMoreMessagesSucceed,
      fetchMoreRepliesSucceed,
      messagesFetcher,
      scrollToBottom,
      threadId,
      nextCursor,
      setNextCursor,
      _sendMessage,
      ...rest
    }) => rest,
  ),
);

export default enhance(Messages);
