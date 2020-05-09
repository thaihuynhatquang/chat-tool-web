import React from 'react';
import { storiesOf } from '@storybook/react';

import Channel from './components/Channel';
import Channels from './components/Channels';

import { channel, channels } from 'storybook/sampleData';

const ChannelWrapper = (story) => <div style={{ width: 70 }}>{story()}</div>;

const onSelectChannel = (id) => () => {
  alert(`Click to channel ${id}`);
};

storiesOf('Channel', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => <Channel channel={channel} onSelectChannel={onSelectChannel} />)
  .add('selected', () => <Channel channel={channel} onSelectChannel={onSelectChannel} isSelected />)
  .add('default avatar', () => (
    <Channel
      channel={{
        ...channel,
        additionData: { ...channel.additionData, avatarUrl: null },
      }}
      onSelectChannel={onSelectChannel}
    />
  ));

storiesOf('Channels', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => (
    <Channels channels={channels} onSelectChannel={onSelectChannel} selectedChannelId={channels[0].id} />
  ));
