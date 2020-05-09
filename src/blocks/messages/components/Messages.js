import React from 'react';
import Message from './Message';

const Messages = (props) => {
  const { mountRef, messages } = props;

  return (
    <div style={{ overflowX: 'hidden' }} className='h-100 pb-2' ref={mountRef}>
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
    </div>
  );
};

export default Messages;
