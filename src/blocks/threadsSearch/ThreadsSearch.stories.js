import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreadSearch from './components/ThreadSearch';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

storiesOf('ThreadSearch', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <ThreadSearch />);
