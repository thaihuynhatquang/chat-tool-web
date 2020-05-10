import Tags from './components/Tags';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, withHandlers, compose } from 'recompose';
import * as actions from './actions';
import * as services from './services';

const mapState = (state) => {
  const {
    customer: { item },
  } = state;
  return {
    customerId: item && item.id,
    tags: item && Array.isArray(item.tags) ? item.tags : [],
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
      services.addTagToCustomer({ customerId, tagId }).then(() => props.addTagToCustomer(tag));
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
      services.removeTagFromCustomer({ customerId, tagId }).then(() => props.removeTagFromCustomer(tagId));
    },
  }),
  mapProps(({ customerId, addTagToCustomer, removeTagFromCustomer, ...rest }) => rest),
);

export default enhance(Tags);
