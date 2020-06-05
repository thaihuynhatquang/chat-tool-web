import { storiesOf } from '@storybook/react';
import React from 'react';
import PreviewAttachmentFile from './components/PreviewAttachmentFile';
import PreviewAttachmentImage from './components/PreviewAttachmentImage';
import { SendBox } from './components/SendBox';
import SendBoxAttachment from './components/SendBoxAttachment';
import SendBoxDisabled from './components/SendBoxDisabled';
import { DEFAULT_SENDBOX_HEIGHT } from './constants';

const url = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGU91BKoHbBa9bry8Go-TTW9t263vcG9aqzaIwrBfNtWanOeq9Q`;

storiesOf('Send box', module)
  .addDecorator((story) => (
    <div
      style={{
        width: '60%',
        marginTop: 500,
        border: '1px solid grey',
      }}>
      {story()}
    </div>
  ))
  .add('preview attachment image', () => (
    <PreviewAttachmentImage url={url} name='sample.txt' extension='txt' removeAttachment={() => {}} />
  ))
  .add('preview attachment file', () => (
    <PreviewAttachmentFile name='sample.txt' extension='txt' removeAttachment={() => {}} />
  ))
  .add('input sendbox small', () => (
    <SendBox
      size={'sm'}
      height={DEFAULT_SENDBOX_HEIGHT / 2}
      message={''}
      onMessageChange={() => {}}
      sendAndResetBox={() => {}}
      attachment={null}
      dragOver={() => {}}
      handleDragEnter={() => {}}
      handleDragLeave={() => {}}
      handleDrop={() => {}}
    />
  ))
  .add('input sendbox bigger', () => (
    <SendBox
      size={'md'}
      height={DEFAULT_SENDBOX_HEIGHT}
      message={''}
      onMessageChange={() => {}}
      sendAndResetBox={() => {}}
      attachment={null}
      dragOver={() => {}}
      handleDragEnter={() => {}}
      handleDragLeave={() => {}}
      handleDrop={() => {}}
    />
  ))
  .add('sendbox attachment not show emoji', () => (
    <SendBoxAttachment
      size={'md'}
      isShowEmoji={false}
      onAttachmentChange={() => {}}
      onSelectEmoji={(e) => () => alert(e)}
      sendAndResetBox={() => {}}
      toggleEmoji={() => {}}
    />
  ))
  .add('sendbox disabled bigger', () => <SendBoxDisabled height={DEFAULT_SENDBOX_HEIGHT} />)
  .add('sendbox disabled small', () => <SendBoxDisabled height={DEFAULT_SENDBOX_HEIGHT / 2} />);
