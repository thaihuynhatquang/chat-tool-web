import React from 'react';
import { storiesOf } from '@storybook/react';

import Empty from './Empty';

const ChannelWrapper = (story) => <div style={{ width: 500, height: 700, border: '2px solid grey' }}>{story()}</div>;

storiesOf('Empty', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => <Empty />)
  .add('other sizes', () => <Empty size={3} />)
  .add('verical center', () => <Empty centerVertical />);
