import React, { Fragment } from 'react';
import { Input } from 'reactstrap';
import { branch, compose, mapProps, renderComponent, withStateHandlers } from 'recompose';
import { visualTime } from 'shared/utils';

const NormalMode = (props) => {
  const { note, removeNote, toggleEditMode } = props;
  return (
    <Fragment>
      <div>
        <small>
          <span className='text-dark'>{note.user.name}: </span>
          {note.content}
        </small>
      </div>
      <div>
        <small className='text-muted'>
          <span>{visualTime(note.createdAt)}</span>
          <span className='btn-link pl-2 cursor-pointer' onClick={toggleEditMode}>
            Sửa
          </span>
          <span className='btn-link pl-2 cursor-pointer' onClick={removeNote(note.id)}>
            Xóa
          </span>
        </small>
      </div>
    </Fragment>
  );
};

const EditMode = (props) => {
  const { note, contentEdit, setContentEdit, toggleNormalMode, updateNote } = props;
  return (
    <div>
      <div>
        <Input
          type='textarea'
          className='form-control textarea-sm'
          placeholder='Nhập nội dung ghi chú...'
          value={contentEdit}
          onChange={setContentEdit}
        />
        <div className='text-muted'>
          <small>
            <span>{visualTime(note.createdAt)}</span>
            <span className='btn-link pl-2 cursor-pointer' onClick={toggleNormalMode}>
              Hủy
            </span>
            <span
              className='btn-link pl-2 cursor-pointer'
              onClick={() => {
                updateNote(note.id, contentEdit);
                toggleNormalMode();
              }}>
              Lưu
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

const enhance = compose(
  withStateHandlers(
    {
      isEdit: false,
    },
    {
      toggleEditMode: () => () => ({ isEdit: true }),
      toggleNormalMode: () => () => ({ isEdit: false }),
    },
  ),
  withStateHandlers(
    (props) => ({
      contentEdit: props.note.content,
    }),
    {
      setContentEdit: () => (e) => ({ contentEdit: e.target.value }),
    },
  ),
  branch((props) => props.isEdit, renderComponent(EditMode)),
  mapProps(({ isEdit, ...rest }) => rest),
);

export default enhance(NormalMode);
