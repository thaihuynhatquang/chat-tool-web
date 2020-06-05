import React from 'react';
import Modal from 'antd/lib/modal';
import { withStateHandlers } from 'recompose';

const ChangeAvatar = (props) => {
  const { title, visible, onOk, onCancel, avatarUrl, changeAvatarUrl } = props;
  const validAvatarUrl = /^https?:\/\//.test(avatarUrl);
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk(avatarUrl)}
      onCancel={onCancel}
      okButtonProps={{ disabled: !validAvatarUrl }}
      okText='Cập nhật'
      cancelText='Hủy'
      destroyOnClose>
      Nhập url của ảnh đại diện muốn thay đổi:
      <input value={avatarUrl} className='form-control form-control-sm my-2' onChange={changeAvatarUrl} />
      {avatarUrl && !validAvatarUrl && <div className='text-danger'>Url của ảnh đại diện không hợp lệ</div>}
    </Modal>
  );
};

export default withStateHandlers(
  { avatarUrl: '' },
  { changeAvatarUrl: () => (e) => ({ avatarUrl: e.target.value }) },
)(ChangeAvatar);
