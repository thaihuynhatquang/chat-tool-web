import React, { Component } from 'react';

import Channels from 'blocks/channels';
import ThreadHeader from 'blocks/threadsHeader';
import ThreadSearch from 'blocks/threadsSearch';
import Threads from 'blocks/threads';
import MessagesHeader from 'blocks/messagesHeader';
import Messages from 'blocks/messages';
import MessagesSendBox from 'blocks/messagesSendBox';
import ThreadInfo from 'blocks/threadsInfo';

class App extends Component {
  render() {
    return (
      <div className='position-absolute d-flex' style={{ left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
        <div className='flex-grow-0 flex-shrink-0' style={{ width: 70 }}>
          <Channels />
        </div>
        <div className='flex-grow-0 flex-shrink-0' style={{ width: '22%' }}>
          <div className='h-100 d-flex flex-column position-relative'>
            <ThreadHeader />
            <div className='py-3 border-bottom'>
              <ThreadSearch />
            </div>
            <div id='threadlist' className='h-100' style={{ overflowX: 'hidden' }}>
              <Threads />
            </div>
          </div>
        </div>
        <div className='flex-grow-1'>
          <div className='d-flex h-100 justify-content-between flex-column border-left'>
            <MessagesHeader />
            <Messages />
            <MessagesSendBox />
          </div>
        </div>
        <div className='flex-grow-0 flex-shrink-0' style={{ width: '22%' }}>
          <div className='border-left h-100' style={{ overflowY: 'auto' }}>
            <ThreadInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
