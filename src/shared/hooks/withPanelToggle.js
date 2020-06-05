import React from 'react';
import withToggle from './withToggle';
import classnames from 'classnames';

const withPanelToggle = (title) => (Component) =>
  withToggle(
    'panel',
    false,
  )((props) => {
    const { isPanelShow, togglePanel } = props;
    return (
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between px-3 pt-1 align-items-center text-muted' onClick={togglePanel}>
          <u className='cursor-pointer'>
            <small className='font-weight-bold'>{title}</small>
          </u>
          <i
            className={classnames('fas', {
              'fa-angle-down': isPanelShow,
              'fa-angle-right': !isPanelShow,
            })}
          />
        </div>
        <div className={isPanelShow ? 'd-block' : 'd-none'}>
          <Component />
        </div>
      </div>
    );
  });

export default withPanelToggle;
