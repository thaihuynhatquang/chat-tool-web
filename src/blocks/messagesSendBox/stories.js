import React from 'react';
import { storiesOf } from '@storybook/react';

import SendBox from './components/SendBox';

storiesOf('MessageSendBox', module)
  .addDecorator((story) => <div style={{ width: '60%', marginTop: 500, border: '1px solid grey' }}>{story()}</div>)
  .add('simple', () => <SendBox />)
  .add('with Emoji', () => <SendBox isShowEmoji />)
  .add('disabled', () => <SendBox disabled />);
