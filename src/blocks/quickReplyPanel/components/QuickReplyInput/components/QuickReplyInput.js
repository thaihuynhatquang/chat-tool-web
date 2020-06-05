import React from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const QuickReplyInput = (props) => {
  const { content, addNewQuickReply, isLoading, onChangeNewQuickReply } = props;

  const onEnterAddNew = (e) => {
    e.key === 'Enter' && addNewQuickReply(e);
  };

  return (
    <InputGroup>
      <Input
        bsSize='sm'
        type='text'
        className='pl-3'
        placeholder='Thêm trả lời nhanh'
        onChange={onChangeNewQuickReply}
        onKeyPress={!isLoading ? onEnterAddNew : null}
        value={content}
      />
      <InputGroupAddon addonType='prepend'>
        <Button size='sm' color='primary' className='px-3' onClick={!isLoading ? addNewQuickReply : null}>
          {isLoading ? <i className='fas fa-circle-notch fa-spin' /> : <i className='fas fa-plus' />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default QuickReplyInput;
