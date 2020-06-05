import classnames from 'classnames';
import { DEFAULT_AVATAR_URL, THREAD_STATUS_PROCESSING, THREAD_STATUS_UNREAD } from 'shared/constants';
import moment from 'moment';
import React from 'react';
import { Badge } from 'reactstrap';
import { compose, pure } from 'recompose';
import { withExpiredAttachment } from 'shared/hooks';
import { visualTime } from 'shared/utils';
import { formatThreadLastMessage } from '../utils';
import ActionThread from './ActionThread';
import UserServings from './UserServings';

const avatarSize = 44;

const Thread = (props) => {
  const {
    usersServing,
    thread: { id, title, lastMessage, additionData, missCount, missTime, lastMsgAt, status },
    isSelected,
    onSelectThread,
    onCloseThread,
    onProcessThread,
    updateAttachment,
  } = props;

  const avatarUrl = updateAttachment || (additionData && additionData.avatarUrl) || DEFAULT_AVATAR_URL;
  const visualLastMsgAt = lastMsgAt ? visualTime(lastMsgAt) : null;
  return (
    <div
      className={classnames('thread position-relative d-flex py-2 border-bottom cursor-pointer', {
        'item-selected': isSelected,
      })}
      onClick={!isSelected ? onSelectThread(id) : undefined}>
      <div className='px-2 flex-grow-0' style={{ maxWidth: 60 }}>
        <img
          src={avatarUrl}
          alt=''
          className='rounded-circle object-fit-cover'
          width={avatarSize}
          height={avatarSize}
        />
      </div>
      {(status === THREAD_STATUS_PROCESSING || status === THREAD_STATUS_UNREAD) && (
        <div
          className='thread-action position-absolute d-flex'
          style={{
            top: 0,
            right: 0,
          }}>
          <ActionThread missCount={missCount} onProcessThread={onProcessThread(id)} onCloseThread={onCloseThread(id)} />
        </div>
      )}
      <div className='pr-2 flex-grow-1' style={{ minWidth: 100 }}>
        <div className='d-flex justify-content-between align-items-center'>
          <div title={title} className='p-0 text-truncate mr-3'>
            {title}
          </div>
          <small title={visualLastMsgAt} className='updated-at text-primary float-right d-block'>
            {visualLastMsgAt}
          </small>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <small className='text-secondary text-truncate d-block p-0 mr-3'>
            {lastMessage && formatThreadLastMessage(lastMessage)}
          </small>
          <div>
            {missCount > 0 && (
              <small className='float-right'>
                <Badge color='danger' pill>
                  {missCount}
                </Badge>
              </small>
            )}
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <small className='text-danger'>
              {missTime && `Chưa trả lời trong ${moment(missTime).fromNow()}`}
              &nbsp;
            </small>
          </div>
          {usersServing && usersServing.length > 0 && (
            <div>
              <span className='float-right'>
                <UserServings users={usersServing} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const enhance = compose(withExpiredAttachment('updateAttachment', ''), pure);

export default enhance(Thread);
