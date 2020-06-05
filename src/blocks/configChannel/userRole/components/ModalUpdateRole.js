import Modal from 'antd/lib/modal';
import React from 'react';
import Roles from './Roles';

const ModalUpdateRole = (props) => {
  const { name, handleOnChange, handleSubmit, confirmLoading, handleCancel, roles, activeRoles } = props;

  return (
    <Modal
      visible
      title={`Cập nhật vai trò nhân viên ${name || ''}`}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}>
      <div className='ml-5'>
        <Roles roles={roles} activeRoles={activeRoles} handleOnChange={handleOnChange} />
      </div>
    </Modal>
  );
};
export default ModalUpdateRole;
