import React from 'react';
import classNames from 'classnames';

const Empty = ({ size = 2, centerVertical = true, text = 'Danh sách rỗng' }) => (
  <div
    className={classNames('d-flex justify-content-center', {
      'h-100 align-items-center': centerVertical,
    })}>
    <i className={`m-1 text-secondary far fa-folder-open fa-${size}x`} />
    <small className='text-secondary'>{text}</small>
  </div>
);

export default Empty;
