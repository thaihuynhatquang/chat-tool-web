import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.messagesListRef = React.createRef();
  }
  componentDidMount() {
    const messagesListNode = this.messagesListRef.current;
    messagesListNode.scrollTop = messagesListNode.scrollHeight;
  }
  render() {
    const { messages } = this.props;
    console.log(messages);
    return (
      <div style={{ overflowX: 'hidden' }} className='h-100' ref={this.messagesListRef}>
        {messages.reverse().map((message, index) => (
          <Message
            key={message.mid}
            message={message}
            isShowName={index === 0 || message.isVerified !== messages[index - 1].isVerified}
            isShowAvatar={index === messages.length - 1 || message.isVerified !== messages[index + 1].isVerified}
          />
        ))}
      </div>
    );
  }
}

export default Messages;
