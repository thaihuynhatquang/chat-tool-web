import { THREAD_STATUS_PROCESSING } from 'common/constants';

export const initStoreState = {
  userId: null,
  selectedChannelId: null,
  channels: [],
  selectedThreadId: null,
  totalThreadsCount: 0,
  filterThreadsBy: {
    status: THREAD_STATUS_PROCESSING,
  },
  threads: [],
  messages: [],
  customerId: null,
  totalCustomersCount: 0,
  pendingMessages: [],
  entities: {
    channels: {},
    threads: {},
    messages: {},
    customers: {},
    users: {},
  },
};
