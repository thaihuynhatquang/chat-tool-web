import React, { Fragment } from 'react';
import Channel from './Channel';

const Channels = (props) => {
  const { channels, selectedChannelId, onSelectChannel } = props;
  return (
    <Fragment>
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          id={channel.id}
          title={channel.title}
          avatarUrl={channel.additionData && channel.additionData.avatarUrl}
          missCount={channel.missCount}
          isSelected={channel.id === selectedChannelId}
          onSelect={onSelectChannel}
        />
      ))}
    </Fragment>
  );
};

export default Channels;
