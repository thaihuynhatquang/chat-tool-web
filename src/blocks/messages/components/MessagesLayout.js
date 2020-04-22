import React from 'react';
import Messages from './Messages';
import Header from './Header';
import SendBox from './SendBox';

const MessagesLayout = (props) => {
  return (
    <div className='d-flex h-100 justify-content-between flex-column border-left'>
      <Header thread={props.thread} onClickDone={() => null} onClickSpam={(e) => null} />
      <Messages messages={props.messages} />
      <SendBox disabled={props.isDisable} />
    </div>
  );
};

export default MessagesLayout;
