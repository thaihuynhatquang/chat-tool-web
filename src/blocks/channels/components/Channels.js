import React, { Component } from 'react';
import Channel from './Channel';

class Channels extends Component {
  render() {
    const { channels, selectedChannel } = this.props;
    return (
      <div className='d-inline-block'>
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} isSelected={channel.id === selectedChannel} />
        ))}
      </div>
    );
  }
}

export default Channels;
