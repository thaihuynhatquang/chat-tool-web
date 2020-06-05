import Modal from 'antd/lib/modal';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { withFetcher } from 'shared/hooks';
import * as services from '../services';

const TransferThreadModal = (props) => {
  const {
    isModalShow,
    hideModal,
    submitTransferThread,
    transferUsers,
    transferToUserId,
    updateTransferToUserId,
    errorMessage,
    thread,
  } = props;

  return (
    <Modal
      title='Chuyển phòng chat'
      visible={isModalShow}
      onOk={submitTransferThread(transferToUserId)}
      onCancel={hideModal}
      okText='Đồng ý'
      cancelText='Hủy'>
      <p>Vui lòng chọn một nhân viên mà bạn muốn chuyển phòng:</p>
      <div className='col-10 offset-1'>
        {transferUsers &&
          transferUsers.map((user) => (
            <div className='custom-control custom-radio' key={user.id}>
              <input
                id={`transferUser${user.id}`}
                type='radio'
                className='custom-control-input'
                disabled={thread.usersServing && thread.usersServing.find((serving) => serving.id === user.id)}
                checked={transferToUserId === user.id}
                onChange={() => updateTransferToUserId(user.id)}
              />
              <label className='custom-control-label' htmlFor={`transferUser${user.id}`}>
                {user.name}
              </label>
            </div>
          ))}
      </div>
      {errorMessage && (
        <div className='text-danger'>
          <div>Có lỗi xảy ra. Chuyển phòng không thành công.</div>
          <div>Chi tiết lỗi: {errorMessage}</div>
        </div>
      )}
    </Modal>
  );
};

const enhance = compose(
  withState('transferUsers', 'updateTransferUsers', []),
  withState('transferToUserId', 'updateTransferToUserId', null),
  withState('errorMessage', 'updateErrorMessage', false),
  withFetcher(
    'transferUsers',
    async (props) => {
      const res = await services.fetchUsersOfChannel(props.thread.channelId);
      props.updateTransferUsers(res.data);
    },
    {
      fetchOnMount: true,
    },
  ),
  withHandlers({
    submitTransferThread: (props) => (transferToUserId) => () => {
      services
        .transferUser(props.thread.id, transferToUserId)
        .then(() => {
          props.hideModal();
        })
        .catch((err) => {
          props.updateErrorMessage(err.response.data || err.message);
        });
    },
  }),
);

export default enhance(TransferThreadModal);
