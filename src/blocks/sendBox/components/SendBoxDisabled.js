import React from 'react';
import { DEFAULT_SENDBOX_HEIGHT } from '../constants';

const SendBoxDisabled = (props) => {
  const { height = DEFAULT_SENDBOX_HEIGHT } = props;
  return (
    <div className='d-flex align-items-center' style={{ height }}>
      <div className='text-secondary text-center w-100 cursor-disabled'>
        Không thể gửi tin nhắn trong cuộc hội thoại này
      </div>
    </div>
  );
};
export default SendBoxDisabled;
