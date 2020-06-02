import React from 'react';
import { storiesOf } from '@storybook/react';

import NormalThreadSearch from './components/Normal';
import AdvanceThreadSearch from './components/Advance';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

storiesOf('ThreadSearch', module)
  .addDecorator(ThreadWrapper)
  .add('normal mode', () => <NormalThreadSearch />)
  .add('advance mode', () => <AdvanceThreadSearch />);
