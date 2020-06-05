import { storiesOf } from '@storybook/react';
import React from 'react';
import { thread, users } from 'storybook/sampleData';
import ThreadInfo from './components/ThreadInfo';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

storiesOf('ThreadInfo', module)
  .addDecorator(ThreadWrapper)
  .add('close', () => (
    <ThreadInfo thread={thread} activeStaffs={users} historyStaffs={users} open={false} setOpen={(e) => e} />
  ))
  .add('open', () => (
    <ThreadInfo thread={thread} activeStaffs={users} historyStaffs={users} open={true} setOpen={(e) => e} />
  ));
