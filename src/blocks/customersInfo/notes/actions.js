export const CREATE_NOTE_TO_CUSTOMER = 'CREATE_NOTE_TO_CUSTOMER';
export const UPDATE_NOTE_OF_CUSTOMER = 'UPDATE_NOTE_OF_CUSTOMER';
export const REMOVE_NOTE_OF_CUSTOMER = 'REMOVE_NOTE_OF_CUSTOMER';

export const createNoteToCustomer = ({ customerId, note }) => ({
  type: CREATE_NOTE_TO_CUSTOMER,
  customerId,
  note,
});

export const updateNoteOfCustomer = ({ customerId, note }) => ({
  type: UPDATE_NOTE_OF_CUSTOMER,
  customerId,
  note,
});

export const removeNoteOfCustomer = ({ customerId, noteId }) => ({
  type: REMOVE_NOTE_OF_CUSTOMER,
  customerId,
  noteId,
});
