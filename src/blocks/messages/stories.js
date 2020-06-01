import React from 'react';
import { storiesOf } from '@storybook/react';
import Message from './components/Message';
import Messages from './components/Messages';
import { message, messages, attachments } from 'storybook/sampleData';
import { SEND_STATUS_ARRIVED, SEND_STATUS_PENDING, SEND_STATUS_COMPLETED } from './constants';
import { convertMessageToComponentProps } from './utils';

const MessageWrapper = (story) => <div style={{ width: '60%' }}>{story()}</div>;

storiesOf('Message', module)
  .addDecorator(MessageWrapper)
  .add('simple', () => <Message {...convertMessageToComponentProps(message)} isShowName isShowAvatar />)
  .add('inverse', () => <Message {...convertMessageToComponentProps(message)} isInverse isShowName isShowAvatar />)
  .add('long text', () => (
    <Message
      {...convertMessageToComponentProps(message)}
      content='This is very very long text... Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text      Llalaa '
      isShowName
      isShowAvatar
    />
  ))
  .add('with link', () => (
    <Message
      {...convertMessageToComponentProps(message)}
      content='Facebook address: https://www.facebook.com. There    are      spaces    between    word....'
      isShowName
      isShowAvatar
    />
  ))
  .add('with icon and emoji', () => (
    <Message
      {...convertMessageToComponentProps(message)}
      content='Smiley face: :) Sad face: :( 😂😍'
      isShowName
      isShowAvatar
    />
  ))
  .add('with attachments', () => (
    <Message
      {...convertMessageToComponentProps(message)}
      content={null}
      attachments={attachments}
      isShowName
      isShowAvatar
    />
  ))
  .add('with error message', () => (
    <div>
      <Message
        {...convertMessageToComponentProps(message)}
        errorMessage='Something went wrong'
        isShowName
        isShowAvatar
      />
      <Message
        {...convertMessageToComponentProps(message)}
        errorMessage='Something went wrong'
        isInverse
        isVerified
        isShowName
        isShowAvatar
      />
      <Message
        {...convertMessageToComponentProps(message)}
        errorMessage="Something went wrong this is very very long long message error this is very very long long message error this is very very long long message error this is very very long long message error this is very very long long message error  this is very very long long message error this is very very long long message error this is very very long long message :'( error       lala"
        isShowName
        isShowAvatar
      />
    </div>
  ))
  .add('with pending', () => (
    <div>
      <Message {...convertMessageToComponentProps(message)} sendingStatus={SEND_STATUS_PENDING} isShowName />
      <Message {...convertMessageToComponentProps(message)} sendingStatus={SEND_STATUS_ARRIVED} />
      <Message {...convertMessageToComponentProps(message)} sendingStatus={SEND_STATUS_COMPLETED} isShowAvatar />

      <Message
        {...convertMessageToComponentProps(message)}
        isVerified
        isInverse
        mid={4}
        sendingStatus={SEND_STATUS_PENDING}
        isShowName
      />
      <Message
        {...convertMessageToComponentProps(message)}
        isVerified
        isInverse
        mid={4}
        sendingStatus={SEND_STATUS_ARRIVED}
        isShowName
      />
      <Message
        {...convertMessageToComponentProps(message)}
        isVerified
        isInverse
        mid={4}
        sendingStatus={SEND_STATUS_COMPLETED}
        isShowAvatar
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
        { ...message },
      ]}
    />
  ))
  .add('scroll', () => (
    <div style={{ height: 300 }}>
      <Messages messages={messages} />
    </div>
  ))
  .add('2LV messages', () => (
    <Messages
      messageLevel={2}
      replyMessage={() => {}}
      loadMoreReplies={() => {}}
      messages={[
        {
          ...message,
          mid: 1,
          replies: {
            count: 15,
            nextCursor: 'string',
            data: [
              { ...message, mid: 5 },
              { ...message, mid: 4, isVerified: true },
            ],
          },
        },
        {
          ...message,
          mid: 2,
          isVerified: true,
          replies: {
            count: 30,
            nextCursor: 'string',
            data: [
              { ...message, mid: 5 },
              {
                ...message,
                mid: 4,
                isVerified: true,
                sendingStatus: SEND_STATUS_ARRIVED,
              },
            ],
          },
        },
        {
          ...message,
          mid: 3,
          isVerified: true,
          replies: {
            count: 2,
            nextCursor: 'string',
            data: [
              { ...message, mid: 5 },
              {
                ...message,
                mid: 4,
                isVerified: true,
                sendingStatus: SEND_STATUS_PENDING,
              },
            ],
          },
        },
      ]}
    />
  ));
