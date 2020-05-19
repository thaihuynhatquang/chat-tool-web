import React from 'react';
import Message from './Message';
import { visualTime } from 'shared/utils';
import { pure } from 'recompose';

const Messages = (props) => {
  const { mountRef, messages, readAt } = props;

  return (
    <div style={{ overflowX: 'hidden' }} className='h-100 pb-1' ref={mountRef}>
      {[...messages].reverse().map((message, index, messages) => {
        return <Message {...message} key={message.mid} />;
      })}
      {readAt && (
        <small className='pl-5 text-secondary' style={{ fontSize: '60%' }}>
          <i className='fas fa-check' /> Đã xem lúc {visualTime(readAt)}
        </small>
      )}
    </div>
  );
};

export default pure(Messages);
