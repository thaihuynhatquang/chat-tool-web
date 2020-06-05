import classNames from 'classnames';
import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import Form from './Form';
import Note from './Note';

const NotesInfo = (props) => {
  const { notes, isShowForm, toggleAddNoteForm, createNote, updateNote, removeNote } = props;
  return (
    <div className='border-top mt-2'>
      <div className='d-flex justify-content-between mt-2'>
        <small>Ghi chú</small>
        <small onClick={toggleAddNoteForm} className='btn-link cursor-pointer'>
          Thêm ghi chú
        </small>
      </div>
      <Form isShowForm={isShowForm} toggleShowForm={toggleAddNoteForm} submitForm={createNote} />
      {notes.map((note, index) => (
        <div
          key={note.id}
          className={classNames('pt-1', {
            'mt-2 border-top border-light': index > 0,
          })}>
          <Note note={note} updateNote={updateNote} removeNote={removeNote} />
        </div>
      ))}
    </div>
  );
};

const enhance = compose(
  withStateHandlers(
    { isShowForm: false },
    {
      toggleAddNoteForm: ({ isShowForm }) => () => ({ isShowForm: !isShowForm }),
    },
  ),
);

export default enhance(NotesInfo);
