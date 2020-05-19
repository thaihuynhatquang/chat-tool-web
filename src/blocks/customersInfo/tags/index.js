import Tags from './components/Tags';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, withHandlers, compose } from 'recompose';
import * as actions from './actions';
import * as services from './services';
import * as storeGetter from 'shared/getEntities';

const mapState = (state) => {
  const customer = storeGetter.getCustomer(state);
  return {
    customerId: customer && customer.id,
    tags: customer && Array.isArray(customer.tags) ? customer.tags : [],
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.customerId, renderNothing),
  withHandlers({
    addTag: (props) => (tag) => {
      const { customerId } = props;
      const { id: tagId } = tag;
      services.addTagToCustomer({ customerId, tagId }).then(() => props.addTagToCustomer({ customerId, tag }));
    },
    searchTags: (props) => async (searchValue) => {
      const { tags } = props;
      const { data: tagsSearch } = await services.fetchTags({
        content: searchValue,
      });
      return tagsSearch.filter((item) => !tags.find((tag) => tag.id === item.id));
    },
    removeTag: (props) => (tagId) => () => {
      const { customerId } = props;
      services
        .removeTagFromCustomer({ customerId, tagId })
        .then(() => props.removeTagFromCustomer({ customerId, tagId }));
    },
  }),
  mapProps(({ customerId, addTagToCustomer, removeTagFromCustomer, ...rest }) => rest),
);

export default enhance(Tags);
