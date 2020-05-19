export const getUser = (state) => (state.userId ? state.entities.users[state.userId] : null);

export const getChannels = (state) => state.channels.map((key) => state.entities.channels[key]);

export const getThreads = (state) => state.threads.map((key) => state.entities.threads[key]);

export const getSelectedThread = (state) =>
  state.selectedThreadId ? state.entities.threads[state.selectedThreadId] : null;

export const getMessages = (state) =>
  state.messages.map((key) => {
    const message = state.entities.messages[key];
    const customer = state.entities.customers[message.customerId];
    const user = message.userId ? state.entities.users[message.userId] : null;
    return {
      ...message,
      customer,
      user,
    };
  });

export const getCustomer = (state) => (state.customerId ? state.entities.customers[state.customerId] : null);
