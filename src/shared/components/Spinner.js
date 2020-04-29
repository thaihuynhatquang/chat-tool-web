import React from 'react';
import classNames from 'classnames';

const Spinner = ({ size = 3, centerVertical = false }) => {
  return (
    <div
      className={classNames('d-flex justify-content-center', {
        'h-100 align-items-center': centerVertical,
      })}>
      <i className={`m-1 text-primary fas fa-circle-notch fa-spin fa-${size}x`} />
    </div>
  );
};

export default Spinner;
