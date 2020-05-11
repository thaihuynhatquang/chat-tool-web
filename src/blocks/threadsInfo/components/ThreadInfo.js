import React, { Fragment } from 'react';

const getStaffView = (staffs, className, textWhenEmpty) => {
  return (
    <Fragment>
      {staffs.length > 0 ? (
        staffs.map((staff, index) => (
          <div className={`d-inline-block px-1 m-1 rounded text-white ${className}`} key={index}>
            <small>{staff.name}</small>
          </div>
        ))
      ) : (
        <div className={`d-inline-block px-1 m-1 rounded text-white ${className}`}>
          <small>{textWhenEmpty}</small>
        </div>
      )}
    </Fragment>
  );
};
const ThreadInfo = (props) => {
  const { thread, activeStaffs = [], historyStaffs = [], setOpen, open } = props;

  return (
    <div className='p-2'>
      <div className='pt-1'>
        <span className='pr-2'>Đang tham gia:</span>
        <div className='d-inline'>{getStaffView(activeStaffs, 'bg-primary', 'Chưa có')}</div>
      </div>
      <div>
        <span className='pr-2'>Đã tham gia:</span>
        <div className='d-inline'>{getStaffView(historyStaffs, 'bg-secondary', 'Chưa có')}</div>
      </div>
      {thread.additionData && thread.additionData.description && (
        <div className='pt-1'>
          <button className='btn btn-link text-primary p-0' onClick={(e) => setOpen(!open)}>
            <small>Mở rộng</small>
          </button>
          {open && (
            <div className='text-justify'>
              <small>{thread.additionData.description}</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThreadInfo;
