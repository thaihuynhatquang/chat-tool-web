import { THREAD_STATUS_PROCESSING } from 'shared/constants';

export const initStoreState = {
  transferThreads: [],
  userId: null,
  selectedChannelId: null,
  channels: [],
  selectedThreadId: null,
  unreadThreadCount: 0,
  processingThreadCount: 0,
  totalThreadsCount: 0,
  filterThreadsBy: {
    status: THREAD_STATUS_PROCESSING,
    isMine: false,
  },
  threads: [],
  messages: [],
  customerId: null,
  totalCustomersCount: 0,
  pendingMessages: [],
  quickRepliesFetched: false,
  entities: {
    channels: {},
    threads: {},
    messages: {},
    customers: {},
    users: {},
    quickReplies: {},
  },
};
