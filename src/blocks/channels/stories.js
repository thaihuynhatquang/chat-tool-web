import React from 'react';
import { storiesOf } from '@storybook/react';
import Channel from './components/Channel';
import Channels from './components/Channels';
import { channel, channels } from 'storybook/sampleData';

const { id, title, additionData } = channel;
const channelProps = {
  id,
  title,
  avatarUrl: additionData && additionData.avatarUrl,
};
const StoryWrapper = (story) => <div style={{ width: 70 }}>{story()}</div>;

const onSelectChannel = (id) => () => {
  alert(`Click to channel ${id}`);
};

storiesOf('Channel', module)
  .addDecorator(StoryWrapper)
  .add('simple', () => <Channel {...channelProps} onSelect={onSelectChannel} />)
  .add('selected', () => <Channel {...channelProps} onSelect={onSelectChannel} isSelected />)
  .add('with miss count', () => <Channel {...channelProps} missCount={2704} onSelect={onSelectChannel} />)
  .add('default avatar', () => <Channel {...channelProps} avatarUrl={null} onSelect={onSelectChannel} />);

storiesOf('Channels', module)
  .addDecorator(StoryWrapper)
  .add('simple', () => <Channels {...channels} onSelect={onSelectChannel} selectedChannelId={channels[0].id} />);
