import React, { Fragment } from 'react';
import { pure } from 'recompose';
import Message from './Message';
import SendBox from 'blocks/messagesSendBox/components/SendBox';
import { visualTime } from 'shared/utils';
import { convertMessageToComponentProps } from '../utils';

const Messages = (props) => {
  const { mountRef, messages, messageLevel = 1, readAt, loadMoreReplies, replyMessage } = props;

  return (
    <div style={{ overflowX: 'hidden' }} className='h-100 pb-1' ref={mountRef}>
      {[...messages].reverse().map((message, index, array) => {
        if (messageLevel === 2) {
          const { replies } = message;
          return (
            <Fragment key={message.mid}>
              <Message {...convertMessageToComponentProps(message)} isShowName isShowAvatar />
              <div className='ml-5'>
                {replies && (
                  <Fragment>
                    {replies.count - replies.data.length > 0 && (
                      <div className='btn btn-link cursor-pointer'>
                        <small
                          className='ml-5'
                          onClick={loadMoreReplies({
                            messageId: message.mid,
                            nextCursor: replies.nextCursor,
                          })}>
                          Tải thêm bình luận (còn {replies.count - replies.data.length} bình luận)
                        </small>
                      </div>
                    )}
                    {[...replies.data].reverse().map((reply) => (
                      <Message key={reply.mid} {...convertMessageToComponentProps(reply)} isShowName isShowAvatar />
                    ))}
                  </Fragment>
                )}
                <div className='mx-5 mt-3 mb-2 border border-secondary round-input'>
                  <SendBox height={35} size='sm' sendMessage={replyMessage(message.mid)} />
                </div>
              </div>
            </Fragment>
          );
        }
        return (
          <Message
            key={message.mid}
            {...convertMessageToComponentProps(message)}
            isInverse={message.isVerified}
            isShowName={index === 0 || !!message.isVerified !== !!array[index - 1].isVerified}
            isShowAvatar={index === array.length - 1 || !!message.isVerified !== !!array[index + 1].isVerified}
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

export default pure(Messages);
