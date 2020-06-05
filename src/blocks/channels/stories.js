import { storiesOf } from '@storybook/react';
import { CHANNEL_MESSENGER } from 'shared/constants';
import React from 'react';
import { channel, channels } from 'storybook/sampleData';
import Channel, { ChannelPanel } from './components/Channel';
import Channels from './components/Channels';
import { channelTypeToIcon } from './utils';

const { id, title, additionData } = channel;
const channelProps = {
  id,
  title,
  avatarUrl: additionData && additionData.avatarUrl,
};
const emptyFunction = () => {};
const StoryWrapper = (story) => <div style={{ width: 70 }}>{story()}</div>;

const onSelectChannel = (id) => () => {
  alert(`Click to channel ${id}`);
};

storiesOf('Channel', module)
  .addDecorator(StoryWrapper)
  .add('simple', () => <Channel {...channelProps} onSelect={onSelectChannel} onClickManageChannel={() => {}} />)
  .add('selected', () => (
    <Channel {...channelProps} onSelect={onSelectChannel} isSelected onClickManageChannel={() => {}} />
  ))
  .add('with miss count and icon type', () => (
    <Channel
      {...channelProps}
      onClickManageChannel={() => {}}
      missCount={4}
      smallIcon={channelTypeToIcon(CHANNEL_MESSENGER)}
      onSelect={onSelectChannel}
    />
  ))
  .add('default avatar', () => (
    <Channel {...channelProps} avatarUrl={null} onSelect={onSelectChannel} onClickManageChannel={() => {}} />
  ))
  .add('with control nav', () => <ChannelPanel {...channelProps} onClickManageChannel={emptyFunction} />);

storiesOf('Channels', module)
  .addDecorator(StoryWrapper)
  .add('simple', () => (
    <Channels
      onClickManageChannel={emptyFunction}
      channels={channels}
      onSelectChannel={onSelectChannel}
      selectedChannelId={channels[0].id}
    />
  ));
