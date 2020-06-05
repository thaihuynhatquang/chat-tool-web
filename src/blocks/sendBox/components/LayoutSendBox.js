import QuickReplyPanel from 'blocks/quickReplyPanel';
import React from 'react';
import { DEFAULT_SENDBOX_HEIGHT, PREVIEW_ATTACHMENT_SIZE } from '../constants';
import PreviewAttachment from './PreviewAttachment';
import SendBox from './SendBox';
import SendBoxAttachment from './SendBoxAttachment';

const LayoutSendBox = (props) => {
  const {
    attachment,
    height = DEFAULT_SENDBOX_HEIGHT,
    resetAttachment,
    message,
    size,
    isShowEmoji,
    onAttachmentChange,
    onSelectEmoji,
    toggleEmoji,
    sendAndResetBox,
    onMessageChange,
    onAttachmentDrop,
  } = props;
  return (
    <div className='d-flex align-items-center cursor-pointer'>
      <div className='pl-3'>
        <QuickReplyPanel onMessageChange={onMessageChange} />
      </div>
      <div className='w-100'>
        <div
          className='position-relative d-flex justify-content-between align-items-center'
          style={{
            height: attachment ? height + PREVIEW_ATTACHMENT_SIZE : height,
          }}>
          {attachment && <PreviewAttachment attachment={attachment} removeAttachment={resetAttachment} />}
          <div
            className='d-flex position-absolute justify-content-between align-items-center w-100'
            style={{ height, bottom: 0 }}>
            <SendBox
              attachment={attachment}
              size={size}
              height={height}
              message={message}
              onAttachmentDrop={onAttachmentDrop}
              sendAndResetBox={sendAndResetBox}
              onMessageChange={onMessageChange}
            />
            <SendBoxAttachment
              height={height}
              isShowEmoji={isShowEmoji}
              sendAndResetBox={sendAndResetBox}
              onAttachmentChange={onAttachmentChange}
              onSelectEmoji={onSelectEmoji}
              size={size}
              toggleEmoji={toggleEmoji}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSendBox;
