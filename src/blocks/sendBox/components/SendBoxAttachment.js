import { NimblePicker } from 'emoji-mart';
import messengerIcons from 'emoji-mart/data/messenger.json';
import React from 'react';
import { withHiddenBlur } from 'shared/hooks';

const SendBoxAttachment = (props) => {
  const { size, onAttachmentChange, toggleEmoji, sendAndResetBox, isShowEmoji } = props;

  const sharedIconClass = `fa-md px-2 align-bottom text-secondary ${size === 'sm' ? 'font-size-sm' : ''}`;
  return (
    <span className='px-1 text-secondary position-relative' style={{ minWidth: 110 }}>
      <label>
        <input type='file' className='d-none' value={''} onChange={onAttachmentChange} />
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
      {isShowEmoji && <EmojiPanelWithHiddenBlur {...props} />}
    </span>
  );
};

const EmojiPanel = (props) => {
  const { onSelectEmoji, blurRef } = props;
  return (
    <div ref={blurRef}>
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
    </div>
  );
};

const EmojiPanelWithHiddenBlur = withHiddenBlur('hideEmoji')(EmojiPanel);

export default SendBoxAttachment;
