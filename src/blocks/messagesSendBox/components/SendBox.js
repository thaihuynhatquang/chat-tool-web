import React, { Fragment } from 'react';
import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';
import classNames from 'classnames';
import messengerIcons from 'emoji-mart/data/messenger.json';
import { NimblePicker } from 'emoji-mart';

const sharedIconClass = 'fa-lg px-2 align-bottom text-secondary';

const SendBox = (props) => {
  const {
    height = 80,
    size = 'md',
    disabled = false,
    isShowEmoji,
    message,
    toggleEmoji,
    onMessageChange,
    onSelectEmoji,
    sendMessage,
    resetSendBox,
  } = props;

  const sendAndResetBox = () => {
    sendMessage({ message });
    resetSendBox();
  };
  const sendMessageOnEnter = (e) => {
    if (e.key === 'Enter') sendAndResetBox();
  };

  return (
    <div style={{ height }} className='d-flex justify-content-between align-items-center'>
      {disabled ? (
        <div className='text-secondary text-center w-100 cursor-disabled'>
          Không thể gửi tin nhắn trong cuộc hội thoại này
        </div>
      ) : (
        <Fragment>
          <input
            value={message}
            className={classNames('border-0 flex-grow-1 ml-4 text-dark focus-highlight-disabled', {
              'font-size-sm': size === 'sm',
            })}
            placeholder='Nhập tin nhắn...'
            onChange={onMessageChange}
            onKeyPress={sendMessageOnEnter}
          />

          <span className='px-3 text-secondary position-relative'>
            <label>
              <input id='send-file-inp' type='file' className='d-none' />
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
        </Fragment>
      )}
    </div>
  );
};

const enhance = compose(
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
    { message: '' },
    {
      onMessageChange: ({ message }) => (e) => ({ message: e.target.value }),
      onSelectEmoji: ({ message }) => (emoji) => ({
        message: message + emoji.native,
      }),
      resetMessage: () => () => ({ message: '' }),
    },
  ),
  withHandlers({
    resetSendBox: (props) => () => {
      props.hideEmoji();
      props.resetMessage();
    },
  }),
  mapProps(({ resetMessage, hideEmoji, ...rest }) => rest),
);

export default enhance(SendBox);
