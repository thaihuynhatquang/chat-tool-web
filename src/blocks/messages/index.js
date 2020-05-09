import React from 'react';
import Messages from './components/Messages';
import { branch, lifecycle, mapProps, renderNothing, withHandlers, withProps, compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { withFetcher, withScroll } from 'shared/hooks';
import { SEND_STATUS_PENDING, SEND_STATUS_ARRIVED } from './constants';
import * as actions from './actions';
import * as services from './services';

const mapState = (state) => {
  const {
    messages: { items, itemsById },
    pendingMessages: { items: pendItems, itemsById: pendItemsById },
    threads: { thread },
    user,
  } = state;
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
  const messages = items.map((key) => itemsById[key]);
  return {
    messages: [...[...pendingMessages].reverse(), ...messages],
    threadId: thread && thread.id,
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.threadId, renderNothing),
  withFetcher(
    'messages',
    async (props) => {
      const { fetchMessagesSucceed, threadId } = props;
      fetchMessagesSucceed(await services.fetchMessages({ threadId }));
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
      if (node)
        setTimeout(() => {
          node.scrollTop = node.scrollHeight;
        }, 1);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.scrollToBottom();
    },
    componentDidUpdate(prevProps) {
      const { threadId, messages, scrollToBottom } = this.props;

      if (
        prevProps.threadId !== threadId ||
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
      const { fetchMoreMessagesSucceed, threadId, messages } = props;
      fetchMoreMessagesSucceed(await services.fetchMessages({ threadId, offset: messages.length }));
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
      ...rest
    }) => rest,
  ),
);

export default enhance(Messages);
