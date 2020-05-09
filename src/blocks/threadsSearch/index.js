import ThreadSearch from './components/ThreadSearch';
import { compose, withState, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeFilterBy } from './actions';

const mapState = null;

const mapDispatch = (dispatch) => {
  return bindActionCreators(
    {
      changeFilterBy,
    },
    dispatch,
  );
};

const enchance = compose(
  withState('searchText', 'setSearchText', ''),
  connect(mapState, mapDispatch),
  withHandlers({
    onChangeSearchText: (props) => (e) => {
      props.setSearchText(e.target.value.trim());
    },
    onSearch: (props) => (e) => {
      if (e.key === 'Enter') {
        props.changeFilterBy({ title: props.searchText });
      }
    },
  }),
);
export default enchance(ThreadSearch);
