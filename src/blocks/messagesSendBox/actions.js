export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCEED = 'SEND_MESSAGE_SUCCEED';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

export const sendMessage = ({ identifier, threadId, message, attachment, parentId }) => ({
  type: SEND_MESSAGE,
  identifier,
  threadId,
  message,
  attachment,
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
