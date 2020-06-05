import React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, mapProps, renderNothing, withHandlers, withProps, withState } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withEmpty, withFetcher, withLoading, withScroll } from 'shared/hooks';
import * as actions from './actions';
import Messages from './components/Messages';
import { FETCH_REPLIES_LIMIT, SEND_STATUS_COMPLETED } from './constants';
import * as services from './services';
import { getFormattedPendingMessages } from './utils';

const getFormatStatus = (message, readAtValue) =>
  message.isVerified ? (readAtValue && message.msgCreatedAt > readAtValue ? SEND_STATUS_COMPLETED : null) : null;

const getReplies = (message, pendingMessages) =>
  message.replies
    ? {
        ...message.replies,
        data: [...pendingMessages, ...((message.replies && message.replies.data) || [])],
      }
    : pendingMessages.length > 0
    ? {
        count: 1,
        data: pendingMessages,
      }
    : null;

const mapState = (state) => {
  const { pendingMessages } = state;
  const user = storeGetter.getMe(state);
  const thread = storeGetter.getSelectedThread(state);
  const channel = storeGetter.getChannelById(state, thread && thread.channelId);
  const messageLevel = storeGetter.getChannelMessageLevel(channel);
  const readAtValue = thread && thread.readAt;

  if (!thread || !user) return {};
  const formattedPendingMessages = getFormattedPendingMessages(pendingMessages, thread, user);
  const messages = storeGetter.getMessages(state).map((item) => {
    const filterPendingMessages = formattedPendingMessages.filter((_item) => _item.parentId === item.mid);
    const filterPendingMessagesRev = [...filterPendingMessages].reverse();

    return {
      ...item,
      sendingStatus: getFormatStatus(item, readAtValue),
      replies: getReplies(item, filterPendingMessagesRev),
    };
  });
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
  withState('threadLogs', 'setThreadLogs', []),
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
  withFetcher(
    'threadLogs',
    async (props) => {
      const { threadId, setThreadLogs } = props;
      const { data: threadLogs } = await services.fetchThreadLogs({
        threadId,
      });
      setThreadLogs(threadLogs);
    },
    {
      fetchOnMount: true,
      fetchOnPropsChange: ['threadId'],
    },
  ),
  withLoading((props) => props.messagesFetcher.isLoading),
  withEmpty((props) => props.messages.length === 0),
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
    updateAvatarCustomerAllMessages: (props) => (updatedCustomer) => {
      props.updateAvatarCustomerSucceed(updatedCustomer);
    },
    clearMiss: (props) => (input) => async () => {
      await services.clearMiss(input);
    },
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
      threadLogsFetcher,
      setThreadLogs,
      ...rest
    }) => rest,
  ),
);

export default enhance(Messages);
