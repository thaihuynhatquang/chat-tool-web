import React from 'react';
import { storiesOf } from '@storybook/react';

import Message from './components/Message';
import Messages from './components/Messages';

import { message, messages, attachments } from 'storybook/sampleData';
import { SEND_STATUS_ARRIVED, SEND_STATUS_PENDING, SEND_STATUS_COMPLETED } from './constants';

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
  ))
  .add('with error message', () => (
    <div>
      <Message message={{ ...message, errorMessage: 'Something went wrong' }} isShowName isShowAvatar />
      <Message
        message={{
          ...message,
          isVerified: true,
          errorMessage: 'Something went wrong',
        }}
        isShowName
        isShowAvatar
      />
    </div>
  ))
  .add('with pending', () => (
    <div>
      <Message message={message} sendingStatus={SEND_STATUS_PENDING} isShowName />
      <Message message={message} sendingStatus={SEND_STATUS_ARRIVED} />
      <Message message={message} sendingStatus={SEND_STATUS_COMPLETED} isShowAvatar />

      <Message
        message={{
          ...message,
          isVerified: true,
          mid: 4,
          sendingStatus: SEND_STATUS_PENDING,
        }}
        isShowName
      />
      <Message
        message={{
          ...message,
          isVerified: true,
          mid: 4,
          sendingStatus: SEND_STATUS_ARRIVED,
        }}
        isShowName
      />
      <Message
        message={{
          ...message,
          isVerified: true,
          mid: 4,
          sendingStatus: SEND_STATUS_COMPLETED,
        }}
        isShowName
      />
    </div>
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
