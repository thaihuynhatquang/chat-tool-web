import React from 'react';
import { storiesOf } from '@storybook/react';

import Channel from './components/Channel';
import Channels from './components/Channels';
import ChannelsLayout from './components/ChannelsLayout';

import { channel, channels } from 'storybook/sampleData';

const ChannelWrapper = (story) => <div style={{ width: 70 }}>{story()}</div>;

storiesOf('Channel', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => <Channel channel={channel} />)
  .add('selected', () => <Channel channel={channel} isSelected />)
  .add('default avatar', () => (
    <Channel
      channel={{
        ...channel,
        additionData: { ...channel.additionData, avatarUrl: null },
      }}
    />
  ));

storiesOf('Channels', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => <Channels channels={channels} selectedChannel={channels[0].id} />);

storiesOf('Channels Layout', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => <ChannelsLayout channels={channels} selectedChannel={channels[0].id} />);
