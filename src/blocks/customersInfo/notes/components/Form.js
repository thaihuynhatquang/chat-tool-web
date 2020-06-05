import React from 'react';
import { Input } from 'reactstrap';
import { branch, compose, mapProps, renderNothing, withStateHandlers } from 'recompose';

const styleButton = {
  width: '120px',
};

const NoteForm = (props) => {
  const { content, setContent, toggleShowForm, submitForm } = props;
  return (
    <div className='mt-2'>
      <Input
        type='textarea'
        name='new-note'
        value={content}
        className='form-control textarea-sm'
        placeholder='Nhập nội dung ghi chú...'
        onChange={setContent}
      />
      <div className='d-flex justify-content-between mt-2'>
        <button className='btn btn-secondary btn-sm' style={styleButton} onClick={toggleShowForm}>
          Hủy
        </button>
        <button
          className='btn btn-primary btn-sm'
          style={styleButton}
          onClick={() => {
            submitForm(content);
            toggleShowForm();
          }}>
          Lưu
        </button>
      </div>
    </div>
  );
};

const enhance = compose(
  branch((props) => !props.isShowForm, renderNothing),
  withStateHandlers(
    {
      content: '',
    },
    {
      setContent: () => (e) => ({ content: e.target.value }),
    },
  ),
  mapProps(({ isShowForm, ...rest }) => rest),
);

export default enhance(NoteForm);
