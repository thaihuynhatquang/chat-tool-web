import React, { Fragment } from 'react';
import Note from './Note';

const NoteList = (props) => {
  return (
    <Fragment>
      {props.notes.map((note, i) => (
        <Note note={note} key={i} />
      ))}
    </Fragment>
  );
};

export default NoteList;
