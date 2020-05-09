import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreadHeader from './components/ThreadHeader';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

storiesOf('ThreadHeader', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <ThreadHeader status='processing' count={30} />);
