import { MESSAGE_TYPE_TEXT } from './constants';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCEED = 'SEND_MESSAGE_SUCCEED';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

export const sendMessage = ({ identifier, threadId, message, messageType = MESSAGE_TYPE_TEXT, parentId }) => ({
  type: SEND_MESSAGE,
  identifier,
  threadId,
  message,
  messageType,
  parentId,
});

export const sendMessageSucceed = ({ identifier, messageId }) => ({
  type: SEND_MESSAGE_SUCCEED,
  identifier,
  messageId,
});

export const sendMessageFailed = ({ identifier, errorMessage }) => ({
  type: SEND_MESSAGE_FAILED,
  identifier,
  errorMessage,
});
