import { connect } from 'react-redux';
import { branch, compose, mapProps, renderNothing, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import * as actions from './actions';
import Notes from './components/Notes';
import * as services from './services';

const mapState = (state) => {
  const customer = storeGetter.getCustomer(state);
  return {
    customerId: customer && customer.id,
    notes: customer && Array.isArray(customer.notes) ? customer.notes.reverse() : [],
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.customerId, renderNothing),
  withHandlers({
    createNote: (props) => (content) => {
      const { customerId } = props;
      services.createNoteToCustomer({ customerId, content }).then((res) => {
        props.createNoteToCustomer({ customerId, note: res });
      });
    },
    updateNote: (props) => (noteId, content) => {
      const { customerId } = props;
      services.updateNoteToCustomer({ customerId, noteId, content }).then((res) => {
        props.updateNoteOfCustomer({ customerId, note: res });
      });
    },
    removeNote: (props) => (noteId) => () => {
      const { customerId } = props;
      services.removeNoteFromCustomer({ customerId, noteId }).then(() => {
        props.removeNoteOfCustomer({ customerId, noteId });
      });
    },
  }),
  mapProps(({ createNoteToCustomer, removeNoteOfCustomer, updateNoteOfCustomer, ...rest }) => rest),
);

export default enhance(Notes);
