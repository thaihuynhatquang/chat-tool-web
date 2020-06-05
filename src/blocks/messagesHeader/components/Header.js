import { THREAD_STATUS_DONE, THREAD_STATUS_PROCESSING, THREAD_STATUS_SPAM, THREAD_STATUS_UNREAD } from 'shared/constants';
import React, { Fragment } from 'react';
import { withChangeStatusThread } from 'shared/hooks';
import TransferThreadModal from './TransferThreadModal';

const avatarSize = 40;

const ThreadDoneButton = withChangeStatusThread((props) => {
  return (
    <button className='btn btn-outline-success border-0 rounded-0 px-4' onClick={props.onOpenModal}>
      <small>
        <i className='fas fa-check' />
        <p className='d-none d-sm-block'>Hoàn thành</p>
      </small>
    </button>
  );
});

const ThreadSpamButton = withChangeStatusThread((props) => {
  return (
    <button className='btn btn-outline-secondary border-0 rounded-0' onClick={props.onOpenModal}>
      <small>
        <i className='fas fa-trash' />
        <p className='d-none d-sm-block'>Spam</p>
      </small>
    </button>
  );
});

const Header = (props) => {
  const {
    me,
    channel,
    thread,
    onClickDone,
    onClickReopen,
    onClickSpam,
    isTransferThreadModalShow,
    showTransferThreadModal,
    hideTransferThreadModal,
  } = props;
  const { status, additionData } = thread;
  const avatarUrl = (additionData && additionData.avatarUrl) || '/images/default.png';
  const shouldShowProcessingButton =
    (status === THREAD_STATUS_UNREAD && channel.configs && channel.configs.isBroadcast) ||
    (status === THREAD_STATUS_DONE && thread.usersHistory && thread.usersHistory.find((user) => user.id === me.id)) ||
    status === THREAD_STATUS_SPAM;
  return (
    <div className='d-flex justify-content-between align-items-center border-bottom' style={{ height: 60 }}>
      <div className='d-flex align-items-center p-2' style={{ width: '55%' }}>
        <img
          className='rounded-circle object-fit-cover'
          src={avatarUrl}
          alt=''
          width={avatarSize}
          height={avatarSize}
        />
        <div className='p-2 text-truncate d-block'>
          {additionData && additionData.url ? (
            <a href={additionData.url} className='btn btn-link' target='_blank' rel='noopener noreferrer'>
              {thread.title}
              <small>
                <i className='ml-2 fas fa-external-link-alt fa-xs' />
              </small>
            </a>
          ) : (
            thread.title
          )}
        </div>
      </div>
      <div className='d-flex flex-row btn-group h-100 d-block flex-grow-1' style={{ width: '45%' }}>
        {status === THREAD_STATUS_PROCESSING && (
          <Fragment>
            <button className='btn btn-outline-info border-0 rounded-0' onClick={showTransferThreadModal}>
              <small>
                <i className='fas fa-handshake' />
                <p className='d-none d-sm-block'>Chuyển phòng</p>
              </small>
            </button>
            <TransferThreadModal
              thread={thread}
              isModalShow={isTransferThreadModalShow}
              hideModal={hideTransferThreadModal}
            />
          </Fragment>
        )}
        {shouldShowProcessingButton && (
          <button className='btn btn-outline-primary border-0 rounded-0 px-4' onClick={onClickReopen}>
            <small>
              <i className='fas fa-door-open' />
              <p className='d-none d-sm-block'>Nhận phòng</p>
            </small>
          </button>
        )}
        {status !== THREAD_STATUS_SPAM && status !== THREAD_STATUS_DONE && <ThreadSpamButton onConfirm={onClickSpam} />}
        {status !== THREAD_STATUS_DONE && <ThreadDoneButton onConfirm={onClickDone} />}
      </div>
    </div>
  );
};

export default Header;
