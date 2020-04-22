import React from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const NoteInfo = (props) => {
  return (
    <div className='mt-2 p-2 pb-0 border-top'>
      <NoteForm />
      <NoteList notes={props.notes} />
    </div>
  );
};

export default NoteInfo;
