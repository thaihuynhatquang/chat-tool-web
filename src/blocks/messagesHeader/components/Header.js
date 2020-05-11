import React from 'react';
import { THREAD_STATUS_SPAM, THREAD_STATUS_PROCESSING, THREAD_STATUS_DONE } from 'common/constants';

const avatarSize = 40;

const Header = (props) => {
  const { thread, onClickDone, onClickReopen, onClickSpam } = props;
  const { status, additionData } = thread;
  const avatarUrl = (additionData && additionData.avatarUrl) || '/images/default.png';
  return (
    <div className='d-flex justify-content-between align-items-center border-bottom' style={{ height: 60 }}>
      <div className='d-flex align-items-center p-2'>
        <img
          className='rounded-circle object-fit-cover'
          src={avatarUrl}
          alt={thread.title}
          width={avatarSize}
          height={avatarSize}
        />
        <div className='p-2'>{thread.title}</div>
      </div>
      <div className='btn-group h-100'>
        {status !== THREAD_STATUS_SPAM && (
          <button className='btn btn-outline-secondary border-0 rounded-0' onClick={onClickSpam}>
            <small>
              <i className='fas fa-trash' /> Spam
            </small>
          </button>
        )}
        {status !== THREAD_STATUS_PROCESSING && (
          <button className='btn btn-outline-primary border-0 rounded-0 px-4' onClick={onClickReopen}>
            <small>
              <i className='fas fa-door-open' /> Mở lại
            </small>
          </button>
        )}
        {status !== THREAD_STATUS_DONE && (
          <button className='btn btn-outline-success border-0 rounded-0 px-4' onClick={onClickDone}>
            <small>
              <i className='fas fa-check' /> Hoàn thành
            </small>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
