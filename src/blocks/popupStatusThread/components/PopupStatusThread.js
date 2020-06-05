import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import closeThreadReasons from 'configs/closeThreadReasons';
import React from 'react';
import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';

const PopupStatusThread = (props) => {
  const { cause, visible, confirmLoading, emptyInput, onChangeCause, handleCancel, handleOk } = props;

  const suffix = cause ? <Icon type='close-circle' onClick={emptyInput} /> : null;

  const prefix = <Icon type='question-circle' style={{ color: 'rgba(0,0,0,.25)' }} onClick={emptyInput} />;
  return (
    <Modal
      title='Lý do đóng phòng'
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}>
      Chọn lí do đóng phòng
      <select className='form-control mb-2' value={cause} onChange={onChangeCause} style={{ fontSize: 14 }}>
        <option value=''>Lí do đóng phòng</option>
        {closeThreadReasons.map((reason) => (
          <option key={reason} value={reason}>
            {reason}
          </option>
        ))}
      </select>
      Hoặc nhập lí do đóng phòng khác
      <Input
        placeholder='Nhập lí do đóng phòng khác'
        prefix={prefix}
        suffix={suffix}
        value={cause}
        onClick={(e) => e.stopPropagation()}
        onPressEnter={handleOk}
        onChange={onChangeCause}
      />
    </Modal>
  );
};

const enhance = compose(
  withStateHandlers((props) => ({ cause: '', confirmLoading: false }), {
    setCause: (state) => (value) => ({ ...state, cause: value }),
    setConfirmLoading: (state) => (value) => ({
      ...state,
      confirmLoading: value,
    }),
    emitEmpty: (state) => () => ({
      ...state,
      confirmLoading: false,
      cause: '',
    }),
  }),
  withHandlers({
    onChangeCause: (props) => (e) => {
      e.stopPropagation();
      props.setCause(e.target.value);
    },
    handleOk: (props) => (e) => {
      e.stopPropagation();
      const cause = props.cause.trim();
      if (!cause) return;

      props.setConfirmLoading(true);

      // TODO: should use await here
      props.confirmFunction({ cause })(e);
      // props.emitEmpty()
      // props.setVisible(false)
    },
    handleCancel: (props) => (e) => {
      e.stopPropagation(e);
      props.setVisible(false);
    },
    emptyInput: (props) => (e) => {
      e.stopPropagation();
      props.emitEmpty();
    },
  }),
  mapProps(({ setCause, setConfirmLoading, ...rest }) => rest),
);

export default enhance(PopupStatusThread);
