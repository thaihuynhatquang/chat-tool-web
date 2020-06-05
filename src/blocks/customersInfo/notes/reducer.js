import { initStoreState } from 'configs/initState';
import { CREATE_NOTE_TO_CUSTOMER, REMOVE_NOTE_OF_CUSTOMER, UPDATE_NOTE_OF_CUSTOMER } from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case CREATE_NOTE_TO_CUSTOMER: {
      const { note, customerId } = action;
      if (!state.customerId) return state;
      if (state.customerId !== customerId) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            [customerId]: {
              ...state.entities.customers[customerId],
              notes: [...state.entities.customers[customerId].notes, note],
            },
          },
        },
      };
    }
    case UPDATE_NOTE_OF_CUSTOMER: {
      const { note: updatedNote, customerId } = action;
      if (!state.customerId) return state;
      if (state.customerId !== customerId) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            [customerId]: {
              ...state.entities.customers[customerId],
              notes: state.entities.customers[customerId].notes.map((note) => {
                if (note.id !== updatedNote.id) return note;
                return updatedNote;
              }),
            },
          },
        },
      };
    }
    case REMOVE_NOTE_OF_CUSTOMER: {
      const { noteId, customerId } = action;
      if (!state.customerId) return state;
      if (state.customerId !== customerId) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            [customerId]: {
              ...state.entities.customers[customerId],
              notes: state.entities.customers[customerId].notes.filter((note) => note.id !== noteId),
            },
          },
        },
      };
    }
    default:
      return state;
  }
};
