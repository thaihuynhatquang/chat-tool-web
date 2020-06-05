import { DEFAULT_AVATAR_URL } from 'shared/constants';
import React from 'react';
import { pure } from 'recompose';
import ChangeAvatar from 'shared/components/ChangeAvatar';
import { withHiddenBlur, withToggle } from 'shared/hooks';

const avatarSize = 50;
const listGroupClass = 'list-group-item pl-3 pr-0 py-1 select-none';

const User = (props) => {
  const {
    user: { avatarUrl = DEFAULT_AVATAR_URL, name },
    togglePanel,
    isPanelShow,
    isChangeAvatarModalShow,
    hideChangeAvatarModal,

    updateUserInfo,
  } = props;

  const updateUserAvatar = (avatarUrl) => () => {
    updateUserInfo({ avatarUrl }).then(() => hideChangeAvatarModal());
  };

  return (
    <div className='p-2 mb-2 position-relative'>
      <div className='cursor-pointer' onContextMenu={togglePanel}>
        <img
          src={avatarUrl || DEFAULT_AVATAR_URL}
          alt={name}
          className='rounded-circle mw-100 object-fit-cover'
          width={avatarSize}
          height={avatarSize}
        />
      </div>
      {isPanelShow && <UserPanelWithHiddenBlur {...props} />}
      <ChangeAvatar
        title='Đổi ảnh đại diện'
        visible={isChangeAvatarModalShow}
        onCancel={hideChangeAvatarModal}
        onOk={updateUserAvatar}
      />
    </div>
  );
};

const UserPanel = (props) => {
  const {
    blurRef,
    user: { name },
    logout,
    showChangeAvatarModal,
  } = props;

  return (
    <ul
      className='list-group text-left position-absolute'
      style={{
        bottom: '-.5rem',
        left: '4.3rem',
        minWidth: 180,
        zIndex: 1,
      }}
      ref={blurRef}>
      <li className={`${listGroupClass} text-primary`}>
        <small>Xin chào, {name}!</small>
      </li>
      <li
        className={`${listGroupClass} list-group-item-action text-secondary cursor-pointer`}
        onClick={showChangeAvatarModal}>
        <small>Đổi ảnh đại diện</small>
      </li>
      <li className={`${listGroupClass} text-danger cursor-pointer`} onClick={logout}>
        <small>Đăng xuất</small>
      </li>
    </ul>
  );
};

const UserPanelWithHiddenBlur = withHiddenBlur('hidePanel')(UserPanel);

export default withToggle('panel')(withToggle('changeAvatarModal')(pure(User)));
