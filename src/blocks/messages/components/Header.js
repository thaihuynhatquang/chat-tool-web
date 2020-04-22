import React from 'react';

const Header = (props) => {
  const { thread, onClickDone, onClickSpam } = props;
  return (
    <div className='d-flex justify-content-between align-items-center p-2 border-bottom' style={{ height: 70 }}>
      <div className='d-flex align-items-center'>
        <div style={{ maxWidth: 50 }}>
          <img className='rounded-circle mw-100' src={thread.additionData.avatarUrl} alt='avatar' />
        </div>
        <div className='p-2'>{thread.title}</div>
      </div>
      <div className='d-flex'>
        <div className='btn-group btn-group-toggle'>
          <div className='btn btn-outline-secondary' onClick={onClickSpam}>
            <i className='fas fa-trash' /> Spam
          </div>
          <div className='btn btn-outline-success' onClick={onClickDone}>
            <i className='fas fa-check' /> Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
