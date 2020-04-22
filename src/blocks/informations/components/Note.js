import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Input } from 'reactstrap';
import { visualTime } from 'shared/utils';

const Note = (props) => {
  const { note, setEdit, onSave, edit, contentEdit } = props;
  return (
    <div className='border-top mt-2 pt-1'>
      <div>
        {!edit ? (
          <small>
            {note.creator.name} - {note.content}
          </small>
        ) : (
          <Input
            className='px-1 py-0'
            type='text'
            value={contentEdit}
            onChange={(e) => {
              props.setContentEdit(e.target.value);
            }}
            style={{ fontSize: '13px' }}
          />
        )}
      </div>
      <div className='text-muted'>
        <small>
          <span>{visualTime(note.createdAt)}</span>
          {!edit ? (
            <span
              className='btn-link pl-2 cursor-pointer'
              onClick={(e) => {
                props.setContentEdit(note.content);
                setEdit(!props.edit);
              }}>
              Sửa
            </span>
          ) : (
            <span className='btn-link pl-2 cursor-pointer' onClick={(e) => onSave(note.id)()}>
              Lưu
            </span>
          )}
          <span className='btn-link pl-2 cursor-pointer'>Xóa</span>
        </small>
      </div>
    </div>
  );
};

const enhance = compose(
  withState('edit', 'setEdit', false),
  withState('contentEdit', 'setContentEdit', ''),
  withHandlers({
    onSave: (props) => (id) => (e) => {
      // TODO: callAPI here console.log(id, props.contentEdit)
      props.setEdit(!props.edit);
    },
  }),
);

export default enhance(Note);
