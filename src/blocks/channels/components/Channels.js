import React from 'react';
import Channel from './Channel';

const Channels = (props) => {
  const { channels, selectedChannelId, onSelectChannel } = props;
  return (
    <div className='d-inline-block border-right text-center h-100'>
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          isSelected={channel.id === selectedChannelId}
          onSelectChannel={onSelectChannel}
        />
      ))}
    </div>
  );
};

export default Channels;
