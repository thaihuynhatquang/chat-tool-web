import React, { Fragment } from 'react';
import { channelTypeToIcon } from '../utils';
import Channel from './Channel';

const Channels = (props) => {
  const { channels, selectedChannelId, onSelectChannel, onClickManageChannel, updateUserConfigsOfChannel } = props;
  return (
    <Fragment>
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          id={channel.id}
          title={channel.title}
          configs={channel.configs}
          userConfigs={channel['ChannelUser.configs']}
          avatarUrl={channel.additionData && channel.additionData.avatarUrl}
          missCount={channel.missCount}
          smallIcon={channelTypeToIcon(channel.type)}
          isSelected={channel.id === selectedChannelId}
          onSelect={onSelectChannel}
          onClickManageChannel={onClickManageChannel}
          updateUserConfigs={updateUserConfigsOfChannel(channel.id)}
        />
      ))}
    </Fragment>
  );
};

export default Channels;
