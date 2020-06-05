import { NimbleEmojiIndex } from 'emoji-mart';
import emojiData from 'emoji-mart/data/messenger.json';
import moment from 'moment';
import React from 'react';
import { SEND_STATUS_ARRIVED, SEND_STATUS_PENDING } from './constants';

export const convertPendingMessageAttachment = (attachment) => {
  const { type: attType } = attachment;
  const type = ['image', 'video', 'audio'].find((type) => attType.includes(type)) || 'file';
  return {
    type,
    payload: {
      url: URL.createObjectURL(attachment),
    },
  };
};
export const getFilenameFromUrl = (url) => decodeURI(url.substring(url.lastIndexOf('/') + 1, url.indexOf('?')));

const emojiIndex = new NimbleEmojiIndex(emojiData);
export const formatMessage = (string) => {
  const urlRegex = /.+\.\w\w.*/;
  return (
    string &&
    string.split(/(\s+)/).map((word, index) => {
      if (urlRegex.test(word)) {
        return (
          <a key={index} href={word} target='__blank'>
            {word}
          </a>
        );
      }
      const emoji = (emojiIndex.search(word) || []).find((e) => e.emoticons.includes(word));
      if (emoji) return emoji.native;

      return word;
    })
  );
};

// TODO: Use correct type of message
export const convertMessageToComponentProps = (message) => {
  const {
    mid,
    content,
    customer,
    user,
    isVerified,
    sendingStatus,
    errorMessage,
    additionData,
    msgCreatedAt,
    processed,
  } = message;
  const owner = user || customer;
  const ownerAvatarUrl = user
    ? user.avatarUrl
    : (customer && customer.additionData && customer.additionData.avatarUrl) || '/images/default.png';
  return {
    mid,
    content,
    isVerified,
    customerId: customer ? customer.id : null,
    name: (owner && owner.name) || 'Empty Name',
    avatarUrl: ownerAvatarUrl,
    attachments: additionData && additionData.attachments,
    sendingStatus,
    errorMessage,
    msgCreatedAt,
    processed: !!processed,
  };
};

export const getFormattedPendingMessages = (messages, thread, user) =>
  messages
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
              attachments: [convertPendingMessageAttachment(attachment)],
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
