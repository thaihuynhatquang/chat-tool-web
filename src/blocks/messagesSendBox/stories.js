// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import SendBox from './components/SendBox';

const defaultProps = {
  disabled: false,
  sendMessage: ({ message }) => alert(`Tin nhắn được gửi: ${message}`),
};

storiesOf('MessageSendBox', module)
  .addDecorator((story) => (
    <div
      style={{
        width: '60%',
        marginTop: 500,
        border: '1px solid grey',
        height: 80,
      }}>
      {story()}
    </div>
  ))
  .add('simple', () => <SendBox {...defaultProps} />)
  .add('disabled', () => <SendBox {...defaultProps} disabled />)
  .add('small size', () => <SendBox {...defaultProps} size='sm' />);
