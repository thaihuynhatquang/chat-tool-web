import React from 'react';
import { storiesOf } from '@storybook/react';

import Message from './components/Message';
import Messages from './components/Messages';
import MessagesLayout from './components/MessagesLayout';
import Header from './components/Header';
import SendBox from './components/SendBox';

import { thread, message, messages, attachments } from 'storybook/sampleData';

const MessageWrapper = (story) => <div style={{ width: '60%' }}>{story()}</div>;

storiesOf('Message', module)
  .addDecorator(MessageWrapper)
  .add('simple', () => <Message message={message} isShowName isShowAvatar />)
  .add('with link', () => (
    <Message
      message={{
        ...message,
        content: 'Facebook address: https://www.facebook.com. There    are      spaces    between    word....',
      }}
      isShowName
      isShowAvatar
    />
  ))
  .add('with icon and emoji', () => (
    <Message
      message={{
        ...message,
        content: 'Smiley face: :) Sad face: :( 😂😍',
      }}
      isShowName
      isShowAvatar
    />
  ))
  .add('with attachments', () => (
    <Message message={{ ...message, content: null, additionData: { attachments } }} isShowName isShowAvatar />
  ));

storiesOf('Messages', module)
  .addDecorator(MessageWrapper)
  .add('simple', () => (
    <Messages
      messages={[
        { ...message, mid: 5, isVerified: true },
        { ...message, mid: 4, isVerified: true },
        { ...message, mid: 3 },
        { ...message, mid: 2 },
        message,
      ]}
    />
  ))
  .add('scroll', () => (
    <div style={{ height: 500 }}>
      <Messages messages={messages} />
    </div>
  ));

storiesOf('MessageHeader', module)
  .addDecorator(MessageWrapper)
  .add('simple', () => <Header thread={thread} onClickSpam={() => {}} onClickDone={() => {}} />);

storiesOf('MessageSendBox', module)
  .addDecorator((story) => <div style={{ width: '60%', marginTop: 500 }}>{story()}</div>)
  .add('simple', () => <SendBox />)
  .add('disabled', () => <SendBox disabled />);

storiesOf('MessageLayout', module)
  .addDecorator((story) => <div style={{ width: '60%', height: '100vh' }}>{story()}</div>)
  .add('simple', () => <MessagesLayout messages={messages} thread={thread} isDisable={false} />)
  .add('disabled', () => <MessagesLayout messages={messages} thread={thread} isDisable={true} />);
