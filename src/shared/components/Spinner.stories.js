import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from './Spinner';

const ChannelWrapper = (story) => <div style={{ width: 500, height: 700, border: '2px solid grey' }}>{story()}</div>;

storiesOf('Spinner', module)
  .addDecorator(ChannelWrapper)
  .add('simple', () => <Spinner />)
  .add('other sizes', () => (
    <div>
      <Spinner size={1} />
      <Spinner size={2} />
      <Spinner size={3} />
      <Spinner size={4} />
      <Spinner size={5} />
      <Spinner size={6} />
      <Spinner size={7} />
      <Spinner size={8} />
    </div>
  ))
  .add('verical center', () => <Spinner centerVertical />);
