import SendBox from 'blocks/sendBox';
import moment from 'moment';
import React, { Fragment } from 'react';
import { pure } from 'recompose';
import { visualTime } from 'shared/utils';
import { SEND_STATUS_COMPLETED } from '../constants';
import { convertMessageToComponentProps } from '../utils';
import Message from './Message';

const lastMessageOfCustomer = (index, messages) =>
  index === messages.length - 1 - messages.findIndex((mes) => !mes.isVerified);

const isShowAvatarOnBlockMessage = (message, index, array) =>
  index === array.length - 1 ||
  !!message.isVerified !== !!array[index + 1].isVerified ||
  (!!message.isVerified === true &&
    !!array[index + 1].isVerified === true &&
    message.userId !== array[index + 1].userId);

const isShowNameOnBlockMessage = (message, index, array) =>
  index === 0 ||
  !!message.isVerified !== !!array[index - 1].isVerified ||
  (!!message.isVerified === true &&
    !!array[index - 1].isVerified === true &&
    message.userId !== array[index - 1].userId);

const Messages = (props) => {
  const {
    mountRef,
    messages,
    messageLevel = 1,
    readAt,
    loadMoreReplies,
    updateAvatarCustomerAllMessages,
    clearMiss,
    threadLogs,
  } = props;

  const reverseMessages = [...messages].reverse();

  const mergeMessageAndLog = [
    ...reverseMessages.map((item) => ({ ...item, type: 'message' })),
    ...threadLogs.map((item) => ({ ...item, type: 'log' })),
  ].sort((a, b) => {
    const aCreatedAt = a.type === 'message' ? a.msgCreatedAt : a.createdAt;
    const bCreatedAt = b.type === 'message' ? b.msgCreatedAt : b.createdAt;
    return moment(aCreatedAt).isBefore(moment(bCreatedAt)) ? -1 : 1;
  });

  return (
    <div style={{ overflowX: 'hidden' }} className='h-100 pb-1' ref={mountRef}>
      {mergeMessageAndLog.map((message, index, array) => {
        if (messageLevel === 2) {
          const { replies } = message;
          const isShowAction =
            !message.isVerified &&
            (!replies ||
              !replies.data ||
              !replies.data.find((item) => item.isVerified && item.msgCreatedAt > message.msgCreatedAt));
          return (
            <Fragment key={message.mid}>
              <Message
                {...convertMessageToComponentProps(message)}
                openMessage
                isShowName
                isShowAction={isShowAction}
                isShowAvatar
                clearMiss={clearMiss}
                updateAvatarCustomerAllMessages={updateAvatarCustomerAllMessages}
              />
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
                    {[...replies.data].reverse().map((reply) => {
                      const isShowAction =
                        !reply.isVerified &&
                        !replies.data.find((item) => item.isVerified && item.msgCreatedAt > reply.msgCreatedAt);
                      return (
                        <Message
                          key={reply.mid}
                          {...convertMessageToComponentProps(reply)}
                          openMessage
                          isShowName
                          isShowAction={isShowAction}
                          isShowAvatar
                          clearMiss={clearMiss}
                          updateAvatarCustomerAllMessages={updateAvatarCustomerAllMessages}
                        />
                      );
                    })}
                  </Fragment>
                )}
                {(!message.sendingStatus || message.sendingStatus === SEND_STATUS_COMPLETED) && (
                  <div className='mx-5 mt-3 mb-2 border border-secondary round-input'>
                    {/* NOTE: small input */}
                    <SendBox size='sm' parentId={message.mid} />
                  </div>
                )}
              </div>
            </Fragment>
          );
        }
        if (message.type === 'message') {
          return (
            <Message
              key={message.mid}
              {...convertMessageToComponentProps(message)}
              isInverse={message.isVerified}
              updateAvatarCustomerAllMessages={updateAvatarCustomerAllMessages}
              isShowName={isShowNameOnBlockMessage(message, index, array)}
              clearMiss={clearMiss}
              isShowAction={lastMessageOfCustomer(index, messages)}
              isShowAvatar={isShowAvatarOnBlockMessage(message, index, array)}
            />
          );
        }
        if (message.type === 'log') {
          return (
            <div key={message.id} className='text-center text-secondary text-divider my-4' style={{ fontSize: '80%' }}>
              <span>
                <img
                  alt=''
                  className='align-middle mr-2'
                  src={(message.user && message.user.avatarUrl) || '/images/default.png'}
                  width={16}
                  height={16}
                />
                {message.user && message.user.name} đã đóng phòng với lí do {'"'}
                {message.note}
                {'"'}
              </span>
            </div>
          );
        }
        return false;
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
