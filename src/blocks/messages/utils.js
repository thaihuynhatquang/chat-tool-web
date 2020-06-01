import React from 'react';
import emojiData from 'emoji-mart/data/messenger.json';
import { NimbleEmojiIndex } from 'emoji-mart';

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

export const convertMessageToComponentProps = (message) => {
  const { mid, content, customer, user, isVerified, sendingStatus, errorMessage } = message;
  const owner = user || customer;
  const ownerAvatarUrl = user ? owner.avatarUrl : owner.additionData && owner.additionData.avatarUrl;
  return {
    mid,
    content,
    isVerified,
    name: owner.name,
    avatarUrl: ownerAvatarUrl,
    sendingStatus,
    errorMessage,
  };
};
