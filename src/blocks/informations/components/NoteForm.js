import React, { Fragment } from 'react';
import { compose, withState } from 'recompose';
import { Input } from 'reactstrap';

const styleButton = {
  width: '120px',
};
const NoteForm = (props) => {
  return (
    <Fragment>
      <div className='d-flex justify-content-between'>
        <small>Note</small>
        <small onClick={(e) => props.setOpenAddNote(!props.openAddNote)} className='btn-link cursor-pointer'>
          Add Note
        </small>
      </div>
      {props.openAddNote && (
        <div>
          <div>
            <Input className='p-1 mt-2' type='textarea' name='note' style={{ resize: 'none', fontSize: '14px' }} />
          </div>
          <div className='d-flex justify-content-between mt-2'>
            <button className='btn btn-secondary btn-sm' style={styleButton}>
              Cancel
            </button>
            <button className='btn btn-primary btn-sm' style={styleButton}>
              Save
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const enhance = compose(withState('openAddNote', 'setOpenAddNote', false));

export default enhance(NoteForm);
