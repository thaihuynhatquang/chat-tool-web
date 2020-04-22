/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { compose, withState } from 'recompose';

const ThreadInfo = (props) => {
  const { thread, activeStaffs = [], historyStaffs = [], setOpen, open } = props;

  return (
    <div className='p-2'>
      <div className='pt-1'>
        <span className='pr-2'>Đang chat:</span>
        <div className='d-inline'>
          {activeStaffs.map((staff, index) => (
            <div className='d-inline-block px-1 m-1 rounded text-white bg-primary' key={index}>
              <small>{staff.name}</small>
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className='pr-2'>Đã chat:</span>
        <div className='d-inline'>
          {historyStaffs.map((staff, index) => (
            <div className='d-inline-block px-1 m-1 rounded text-white bg-secondary' key={index}>
              <small>{staff.name}</small>
            </div>
          ))}
        </div>
      </div>
      <div className='pt-1'>
        <a className='btn btn-link text-primary p-0' onClick={(e) => setOpen(!open)}>
          <small>Mở rộng</small>
        </a>
        {open && (
          <div className='text-justify'>
            <small>{thread.additionData.description}</small>
          </div>
        )}
      </div>
    </div>
  );
};

const enhance = compose(withState('open', 'setOpen', false));

export default enhance(ThreadInfo);
