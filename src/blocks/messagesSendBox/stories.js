import React from 'react';
import { storiesOf } from '@storybook/react';

import SendBox from './components/SendBox';
import PreviewAttachmentImage from './components/PreviewAttachmentImage';
import PreviewAttachmentFile from './components/PreviewAttachmentFile';

const defaultProps = {
  disabled: false,
  sendMessage: ({ message }) => alert(`Tin nhắn được gửi: ${message}`),
};

const url = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGU91BKoHbBa9bry8Go-TTW9t263vcG9aqzaIwrBfNtWanOeq9Q`;

storiesOf('MessageSendBox', module)
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
  .add('simple', () => <SendBox {...defaultProps} />)
  .add('disabled', () => <SendBox {...defaultProps} disabled />)
  .add('small size', () => <SendBox {...defaultProps} size='sm' height={40} />)
  .add('preview attachment image', () => (
    <PreviewAttachmentImage url={url} name='sample.txt' extension='txt' removeAttachment={() => {}} />
  ))
  .add('preview attachment file', () => (
    <PreviewAttachmentFile name='sample.txt' extension='txt' removeAttachment={() => {}} />
  ));
