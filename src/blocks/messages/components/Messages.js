import React from 'react';
import Message from './Message';
import { visualTime } from 'shared/utils';

const Messages = (props) => {
  const { mountRef, messages, readAt } = props;

  return (
    <div style={{ overflowX: 'hidden' }} className='h-100 pb-1' ref={mountRef}>
      {[...messages].reverse().map((message, index, messages) => {
        return (
          <Message
            key={message.mid}
            message={message}
            isShowName={index === 0 || message.isVerified !== messages[index - 1].isVerified}
            isShowAvatar={index === messages.length - 1 || message.isVerified !== messages[index + 1].isVerified}
          />
        );
      })}
      {readAt && (
        <small className='pl-5 text-secondary' style={{ fontSize: '60%' }}>
          <i className='fas fa-check' /> Đã xem lúc {visualTime(readAt)}
        </small>
      )}
    </div>
  );
};

export default Messages;
