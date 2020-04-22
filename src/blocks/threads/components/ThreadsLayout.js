import React, { Component } from 'react';

import Threads from './Threads';
import ThreadHeader from './ThreadHeader';
import ThreadSearch from './ThreadSearch';

class ThreadsLayout extends Component {
  render() {
    const { currentFilterStatus, countThreads, threads, selectedThread } = this.props;
    return (
      <div className='h-100 d-flex flex-column'>
        <ThreadHeader status={currentFilterStatus} count={countThreads} />
        <div className='py-3 border-bottom'>
          <ThreadSearch />
        </div>
        <div style={{ overflowX: 'hidden' }}>
          <Threads threads={threads} selectedThread={selectedThread} />
        </div>
      </div>
    );
  }
}

export default ThreadsLayout;
