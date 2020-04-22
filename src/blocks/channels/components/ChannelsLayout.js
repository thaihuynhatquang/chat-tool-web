import React, { Component } from 'react';
import Channels from './Channels.js';

class ChannelsLayout extends Component {
  render() {
    const { channels, selectedChannel } = this.props;
    return (
      <div className='border-right text-center h-100'>
        <Channels channels={channels} selectedChannel={selectedChannel} />
      </div>
    );
  }
}

export default ChannelsLayout;
