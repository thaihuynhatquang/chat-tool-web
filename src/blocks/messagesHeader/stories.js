import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './components/Header';
import { thread } from 'storybook/sampleData';

const MessageWrapper = (story) => <div style={{ width: '60%' }}>{story()}</div>;

storiesOf('MessagesHeader', module)
  .addDecorator(MessageWrapper)
  .add('simple', () => <Header thread={thread} onClickSpam={() => {}} onClickDone={() => {}} />);
