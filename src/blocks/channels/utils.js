import { CHANNEL_FB_COMMENT, CHANNEL_MESSENGER } from 'shared/constants';

export const channelTypeToIcon = (channelType) => {
  switch (channelType) {
    case CHANNEL_MESSENGER:
      return 'fab fa-facebook-messenger';
    case CHANNEL_FB_COMMENT:
      return 'fab fa-facebook-square';
    default:
      return '';
  }
};
