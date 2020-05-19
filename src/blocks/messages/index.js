import React from 'react';
import Messages from './components/Messages';
import { branch, lifecycle, mapProps, renderNothing, withHandlers, withProps, withState, compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { withFetcher, withScroll } from 'shared/hooks';
import { SEND_STATUS_PENDING, SEND_STATUS_ARRIVED, SEND_STATUS_COMPLETED } from './constants';
import * as actions from './actions';
import * as services from './services';

const mapState = (state) => {
  const {
    messages: { items, itemsById },
    pendingMessages: { items: pendItems, itemsById: pendItemsById },
    threads: { thread },
    user,
  } = state;
  const readAtValue = thread && thread.readAt;
  const pendingMessages = pendItems
    .filter((key) => thread && pendItemsById[key].threadId === thread.id)
    .map((key) => {
      const { identifier, threadId, message, messageId, errorMessage } = pendItemsById[key];
      const createdAt = moment(identifier, 'x');
      return {
        mid: identifier,
        threadId,
        customer: null,
        content: message,
        sendingStatus: !messageId ? SEND_STATUS_PENDING : SEND_STATUS_ARRIVED,
        isVerified: true,
        user,
        userId: user && user.id,
        errorMessage,
        msgCreatedAt: createdAt,
        msgUpdatedAt: createdAt,
      };
    });
  const messages = items.map((key) => ({
    ...itemsById[key],
    sendingStatus: readAtValue ? (itemsById[key].msgCreatedAt > readAtValue ? SEND_STATUS_COMPLETED : null) : null,
  }));
  // Create merge messages. NOTE: Array in latest-message-first order.
  const mergeMessages = [...[...pendingMessages].reverse(), ...messages].map((message, index, array) => ({
    ...message,
    isShowName: index === array.length - 1 || !!message.isVerified !== !!array[index + 1].isVerified,
    isShowAvatar: index === 0 || !!message.isVerified !== !!array[index - 1].isVerified,
  }));
  const lastMessage = mergeMessages.length > 0 ? mergeMessages[0] : null;
  return {
    messages: mergeMessages,
    threadId: thread && thread.id,
    readAt: thread && lastMessage && lastMessage.msgCreatedAt <= thread.readAt && thread.readAt,
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withState('nextCursor', 'setNextCursor', ''),
  branch((props) => !props.threadId, renderNothing),
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
      messagesFetcher,
      scrollToBottom,
      threadId,
      nextCursor,
      setNextCursor,
      ...rest
    }) => rest,
  ),
);

export default enhance(Messages);
