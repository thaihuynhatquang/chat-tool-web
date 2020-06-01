import React from 'react';
import { pure } from 'recompose';
import { withToggle } from 'shared/hooks';
import { DEFAULT_AVATAR_URL } from 'common/constants';

const listGroupClass = 'list-group-item pl-3 pr-0 py-1 select-none';

const User = (props) => {
  const {
    user: { avatarUrl = DEFAULT_AVATAR_URL, name },
    togglePanel,
    isPanelShow,
    logout,
  } = props;
  return (
    <div className='p-2 mb-2 position-relative'>
      <div className='cursor-pointer' onContextMenu={togglePanel}>
        <img src={avatarUrl} alt={name} className='rounded-circle mw-100 border' />
      </div>
      {isPanelShow && (
        <ul
          className='list-group text-left position-absolute'
          style={{
            bottom: '-.5rem',
            left: '4.3rem',
            minWidth: 180,
            zIndex: 1,
          }}>
          <li className={`${listGroupClass} text-primary`}>
            <small>Xin chào, {name}!</small>
          </li>
          <li className={`${listGroupClass} list-group-item-action text-secondary cursor-pointer`}>
            <small>Thông tin cá nhân</small>
          </li>
          <li className={`${listGroupClass} list-group-item-action text-secondary cursor-pointer`}>
            <small>Tới trang Admins</small>
          </li>
          <li className={`${listGroupClass} text-danger cursor-pointer`} onClick={logout}>
            <small>Đăng xuất</small>
          </li>
        </ul>
      )}
    </div>
  );
};

export default withToggle('panel')(pure(User));
