import { CREATE_NOTE_TO_CUSTOMER, UPDATE_NOTE_OF_CUSTOMER, REMOVE_NOTE_OF_CUSTOMER } from './actions';
import { initStoreState } from 'configs/initState';

export const customerInNotes = (state = initStoreState.customer, action) => {
  switch (action.type) {
    case CREATE_NOTE_TO_CUSTOMER: {
      if (!state.item) return state;
      if (state.item.id !== action.customerId) return state;
      return {
        ...state,
        item: {
          ...state.item,
          notes: [...state.item.notes, action.note],
        },
      };
    }
    case UPDATE_NOTE_OF_CUSTOMER: {
      if (!state.item) return state;
      if (state.item.id !== action.customerId) return state;
      return {
        ...state,
        item: {
          ...state.item,
          notes: state.item.notes.map((note) => {
            if (note.id !== action.note.id) return note;
            return action.note;
          }),
        },
      };
    }
    case REMOVE_NOTE_OF_CUSTOMER: {
      if (!state.item) return state;
      if (state.item.id !== action.customerId) return state;
      return {
        ...state,
        item: {
          ...state.item,
          notes: state.item.notes.filter((note) => note.id !== action.noteId),
        },
      };
    }
    default:
      return state;
  }
};
