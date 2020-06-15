// Key word
export const CHANNEL = 'channel';
export const THREAD = 'thread';
export const MESSAGE = 'message';
export const CUSTOMER = 'customer';

export const DEFAULT_AVATAR_URL = '/images/default.png';

export const CHANNEL_CONFIG_GENERAL_SETTINGS = 'settings';
export const CHANNEL_CONFIG_ROLES_AND_PERMISSIONS = 'roles-permissions';
export const CHANNEL_CONFIG_REPORTS = 'reports';

export const CHANNEL_MESSENGER = 'messenger';
export const CHANNEL_FB_COMMENT = 'fbcomment';

// Thread status
export const THREAD_STATUS_UNREAD = 'unread';
export const THREAD_STATUS_PROCESSING = 'processing';
export const THREAD_STATUS_DONE = 'done';
export const THREAD_STATUS_SPAM = 'spam';

// Socket events
export const SOCKET_NEW_MESSAGE = 'new-message';
export const SOCKET_UPDATE_THREAD = 'update-thread';
export const SOCKET_TRANSFER_THREAD = 'transfer-thread';
export const SOCKET_REFRESH_CHANNEL = 'refresh-channel';
export const SOCKET_UPDATE_CUSTOMER_PHONE = 'update-customer-phone';
// Socket room keys
export const CHANNEL_SOCKET_KEY = 'channel';
export const THREAD_SOCKET_KEY = 'thread';
export const USER_SOCKET_KEY = 'user';

// Permission key
export const PERMISSION_UPDATE_CHANNEL = 'update-channel';
export const PERMISSION_CREATE_INVITE_LINK = 'create-invite-link';
export const PERMISSION_READ_ALL_THREADS = 'read-all-threads';
export const PERMISSION_SEND_MESSAGE = 'send-message';
export const PERMISSION_ADD_USER_TO_CHANNEL = 'add-user-to-channel';
export const PERMISSION_REMOVE_USER_FROM_CHANNEL = 'remove-user-from-channel';
export const PERMISSION_UPDATE_USER_ROLE = 'update-user-role';
export const PERMISSION_AUTO_RECEIVE_THREADS = 'auto-receive-threads';
export const PERMISSION_CREATE_TAG = 'create-tag';
export const PERMISSION_READ_HIDDEN_MESSAGES = 'read-hidden-messages';
export const PERMISSION_CREATE_CHANNEL = "create-channel";

// Role key
export const ROLE_STAFF = 'staff';
export const ROLE_CHANNEL_OWNER = 'channel-owner';
export const ROLE_MAINTAINER = 'maintainer';
