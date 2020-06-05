import { storiesOf } from '@storybook/react';
import React from 'react';
import { thread } from 'storybook/sampleData';
import Header from './components/Header';

const MessageWrapper = (story) => <div style={{ width: '60%' }}>{story()}</div>;
const emptyFun1 = () => {};
const emptyFun2 = () => () => {};

storiesOf('MessagesHeader', module)
  .addDecorator(MessageWrapper)
  .add('simple', () => (
    <Header thread={thread} onClickSpam={emptyFun1} onClickDone={emptyFun2} onClickReopen={emptyFun2} />
  ));
