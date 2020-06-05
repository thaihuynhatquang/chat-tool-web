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
  .add('simple', () => (
    <Message
      {...convertMessageToComponentProps(message)}
      isShowName
      isShowAvatar
      clearMiss={() => async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      }}
    />
  ))
  .add('inverse', () => <Message {...convertMessageToComponentProps(message)} isInverse isShowName isShowAvatar />)
  .add('long text', () => (
    <div>
      <Message
        {...convertMessageToComponentProps(message)}
        content='This is very very long text... Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text Hello world long text long text super long text      Llalaa '
        isShowName
        isShowAvatar
      />
      <Message
        {...convertMessageToComponentProps(message)}
        content='https://video.fhan2-2.fna.fbcdn.net/v/t42.9040-2/10000000_315615409053435_4162200884693958656_n.mp4?_nc_cat=111&efg=eyJ2ZW5jb2RlX3RhZyI6ImRhc2hfdjRfaHE1X2ZyYWdfMl92aWRlbyJ9&_nc_oc=AQmtOQhZJuOTNDYlML_X5MkXxwlkoWoWv1jP9-0YcbpQtKsZoJRJD1LgeaEh2vqX4ZE&_nc_ht=video.fhan2-2.fna&oh=45e7fb7edf78986af7c379f3402a6174&oe=5C50374D'
        isShowName
        isShowAvatar
      />
      <Message
        {...convertMessageToComponentProps(message)}
        content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        isShowName
        isShowAvatar
        isInverse
      />
    </div>
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
  .add('with template', () => {
    const templates = attachments.filter((att) => att.type === 'template');
    return (
      <Message
        {...convertMessageToComponentProps(message)}
        content={null}
        attachments={templates}
        isShowName
        isShowAvatar
        isInverse
      />
    );
  })
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
  ));
// .add('2LV messages', () => (
//   <Messages
//     messageLevel={2}
//     replyMessage={() => {}}
//     loadMoreReplies={() => {}}
//     messages={[
//       {
//         ...message,
//         mid: 1,
//         replies: {
//           count: 15,
//           nextCursor: 'string',
//           data: [
//             { ...message, mid: 5 },
//             { ...message, mid: 4, isVerified: true }
//           ]
//         }
//       },
//       {
//         ...message,
//         mid: 2,
//         isVerified: true,
//         replies: {
//           count: 30,
//           nextCursor: 'string',
//           data: [
//             { ...message, mid: 5 },
//             {
//               ...message,
//               mid: 4,
//               isVerified: true,
//               sendingStatus: SEND_STATUS_ARRIVED
//             }
//           ]
//         }
//       },
//       {
//         ...message,
//         mid: 3,
//         isVerified: true,
//         replies: {
//           count: 2,
//           nextCursor: 'string',
//           data: [
//             { ...message, mid: 5 },
//             {
//               ...message,
//               mid: 4,
//               isVerified: true,
//               sendingStatus: SEND_STATUS_PENDING
//             }
//           ]
//         }
//       }
//     ]}
//   />
// ))
