import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as services from './services';

const TransferThread = (props) => {
  const { receiveTransferThreads, receiveStatus } = props;

  Array.isArray(receiveTransferThreads) &&
    receiveTransferThreads.forEach((transfer) => {
      toast(
        <div>
          <p>
            Nhân viên <b>{transfer.fromUser.name}</b> đã chuyển phòng chat <b>{transfer.thread.title}</b> cho bạn. Nhận
            phòng?
          </p>
          <div>
            <button className='btn btn-sm btn-success ml-3' onClick={receiveStatus(transfer, 'accept')}>
              Đồng ý
            </button>
            <button className='btn btn-sm btn-danger mr-3 float-right' onClick={receiveStatus(transfer, 'decline')}>
              Từ chối
            </button>
          </div>
        </div>,
        { autoClose: false, draggable: false, closeOnClick: false },
      );
    });
  return false;
};

const mapState = (state) => ({ receiveTransferThreads: state.transferThreads });

const enhance = compose(
  connect(mapState),
  withHandlers({
    receiveStatus: (props) => (transferThread, status) => async () => {
      try {
        await services.updateTransferThreadStatus(transferThread.id, status);
        document.location.reload();
      } catch (err) {
        toast.error(`Có lỗi xảy ra khi nhận phòng chuyển giao. Chi tiết lỗi: ${err.message}`);
      }
    },
  }),
);

export default enhance(TransferThread);
