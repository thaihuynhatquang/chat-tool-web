import React, { Component } from 'react';

import ChannelsLayout from 'blocks/channels/components/ChannelsLayout';
import ThreadsLayout from 'blocks/threads/components/ThreadsLayout';
import MessagesLayout from 'blocks/messages/components/MessagesLayout';
import InformationsLayout from 'blocks/informations/components/InformationsLayout';

// TODO: Using sample data to render app. Need to change to other application state.
import { channels, thread, threads, messages, user, users, customer, customers, tags } from 'storybook/sampleData';

const selectedThread = 3;
const selectedChannel = 2;

class App extends Component {
  render() {
    return (
      <div className='position-absolute d-flex' style={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <div className='flex-grow-0 flex-shrink-0' style={{ width: 70 }}>
          <ChannelsLayout channels={channels} selectedChannel={selectedChannel} />
        </div>
        <div className='flex-grow-0 flex-shrink-0' style={{ width: '22%' }}>
          <ThreadsLayout
            threads={threads}
            currentFilterStatus='processing'
            countThreads={30}
            selectedThread={selectedThread}
          />
        </div>
        <div className='flex-grow-1'>
          <MessagesLayout
            messages={messages}
            thread={threads.find((item) => item.id === selectedThread)}
            isDisable={false}
          />
        </div>
        <div className='flex-grow-0 flex-shrink-0' style={{ width: '22%' }}>
          <InformationsLayout
            thread={thread}
            activeStaffs={[user]}
            historyStaffs={users}
            customers={customers}
            tags={tags}
            notes={customer.notes}
          />
        </div>
      </div>
    );
  }
}

export default App;
