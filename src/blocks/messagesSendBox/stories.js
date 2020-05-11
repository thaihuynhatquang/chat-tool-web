import React from 'react';
import { storiesOf } from '@storybook/react';

import SendBox from './components/SendBox';

const emptyFunc = () => {};
const defaultProps = {
  disabled: false,
  isShowEmoji: false,
  message: '',
  onMessageChange: emptyFunc,
  onSelectEmoji: emptyFunc,
  sendMessage: emptyFunc,
  toggleEmoji: emptyFunc,
};

storiesOf('MessageSendBox', module)
  .addDecorator((story) => <div style={{ width: '60%', marginTop: 500, border: '1px solid grey' }}>{story()}</div>)
  .add('simple', () => <SendBox {...defaultProps} />)
  .add('with Emoji', () => <SendBox {...defaultProps} isShowEmoji />)
  .add('disabled', () => <SendBox {...defaultProps} disabled />);
