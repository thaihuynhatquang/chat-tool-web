import React from 'react';
import {
  compose,
  branch,
  mapProps,
  renderComponent,
  withHandlers,
  withStateHandlers,
  withState,
  lifecycle,
} from 'recompose';
import classNames from 'classnames';
import messengerIcons from 'emoji-mart/data/messenger.json';
import { NimblePicker } from 'emoji-mart';
import { PREVIEW_ATTACHMENT_SIZE } from '../constants';
import PreviewAttachment from './PreviewAttachment';

const DEFAULT_SENDBOX_HEIGHT = 80;

const SendBoxDisabled = (props) => {
  const { height = DEFAULT_SENDBOX_HEIGHT } = props;
  return (
    <div className='d-flex align-items-center' style={{ height }}>
      <div className='text-secondary text-center w-100 cursor-disabled'>
        Không thể gửi tin nhắn trong cuộc hội thoại này
      </div>
    </div>
  );
};

const SendBox = (props) => {
  const {
    height = DEFAULT_SENDBOX_HEIGHT,
    size = 'md',
    isShowEmoji,
    message,
    attachment,
    toggleEmoji,
    onMessageChange,
    onAttachmentChange,
    onSelectEmoji,
    sendMessage,
    resetSendBox,
    resetAttachment,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    dragOver,
  } = props;

  const sharedIconClass = `fa-lg px-2 align-bottom text-secondary ${size === 'sm' ? 'font-size-sm' : ''}`;
  const sendAndResetBox = () => {
    sendMessage({ message, attachment });
    resetSendBox();
  };
  const sendMessageOnEnter = (e) => {
    if (e.key === 'Enter') sendAndResetBox();
  };

  return (
    <div
      className='position-relative d-flex justify-content-between align-items-center'
      style={{
        height: attachment ? height + PREVIEW_ATTACHMENT_SIZE : height,
      }}>
      {attachment && <PreviewAttachment attachment={attachment} removeAttachment={resetAttachment} />}
      <div
        className='d-flex position-absolute justify-content-between align-items-center w-100'
        style={{ height, bottom: 0 }}>
        <input
          value={message}
          className={classNames('border-0 flex-grow-1 ml-4 text-dark focus-highlight-disabled', {
            'font-size-sm': size === 'sm',
          })}
          placeholder={dragOver ? 'Nhả chuột để thả!' : 'Nhập tin nhắn...'}
          onChange={onMessageChange}
          onKeyPress={sendMessageOnEnter}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
        <span className='px-3 text-secondary position-relative'>
          <label>
            <input type='file' className='d-none' onChange={onAttachmentChange} />
            <i
              htmlFor='send-file-inp'
              className={`${sharedIconClass} fas fa-paperclip cursor-pointer text-primary-hover`}
            />
            <button className='btn btn-link p-0' onClick={toggleEmoji}>
              <i className={`${sharedIconClass} far fa-smile-wink text-primary-hover`} />
            </button>
            <button className='btn btn-link p-0' onClick={sendAndResetBox}>
              <i className={`${sharedIconClass} far fa-paper-plane text-primary-hover`} />
            </button>
          </label>
          {isShowEmoji && (
            <NimblePicker
              color='#007bff'
              set='messenger'
              data={messengerIcons}
              sheetSize={32}
              showPreview={false}
              onSelect={onSelectEmoji}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                right: 0,
                userSelect: 'none',
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
};

const enhance = compose(
  withState('dragOver', 'setDragOver', false),
  withStateHandlers(
    {
      isShowEmoji: false,
    },
    {
      toggleEmoji: ({ isShowEmoji }) => () => ({
        isShowEmoji: !isShowEmoji,
      }),
      hideEmoji: () => () => ({
        isShowEmoji: false,
      }),
    },
  ),
  withStateHandlers(
    { message: '', attachment: undefined }, // TODO: Support multiple attachments send
    {
      onAttachmentChange: (state) => (e) => ({
        attachment: e.target.files[0],
      }),
      onAttachmentDrop: (state) => (file) => ({
        attachment: file,
      }),
      onMessageChange: ({ message }) => (e) => ({ message: e.target.value }),
      onSelectEmoji: ({ message }) => (emoji) => ({
        message: message + emoji.native,
      }),
      resetMessage: () => () => ({ message: '' }),
      resetAttachment: () => () => ({ attachment: undefined }),
    },
  ),
  withHandlers({
    resetSendBox: (props) => () => {
      props.hideEmoji();
      props.resetMessage();
      props.resetAttachment();
    },
    handleDragEnter: (props) => () => {
      props.setDragOver(true);
    },
    handleDragLeave: (props) => () => {
      props.setDragOver(false);
    },
    handleDrop: (props) => (e) => {
      e.preventDefault();
      props.setDragOver(false);
      const data = e.dataTransfer;
      if (data.items) {
        const dropFile = data.items[0];
        if (dropFile.kind === 'file') {
          const itemFile = dropFile.getAsFile();
          props.onAttachmentDrop(itemFile);
        }
      }
    },
    handlePasteImageEvent: (props) => (e) => {
      const { items } = e.clipboardData;

      const attachment = Object.keys(items)
        .map((key) => items[key])
        .find((file) => file.type && file.type.includes('image'));

      if (!attachment) return;

      const itemFile = attachment.getAsFile();
      props.onAttachmentDrop(itemFile);
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('paste', this.props.handlePasteImageEvent);
    },
    componentWillUnmount() {
      window.removeEventListener('paste', this.props.handlePasteImageEvent);
    },
  }),
  branch((props) => props.disabled === true, renderComponent(SendBoxDisabled)),
  mapProps(({ resetMessage, hideEmoji, setDragOver, handlePasteImageEvent, ...rest }) => rest),
);

export default enhance(SendBox);
