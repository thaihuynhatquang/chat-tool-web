import ThreadSearchNormal from './components/Normal';
import ThreadSearchAdvance from './components/Advance';
import { compose, branch, mapProps, renderComponent, withState, withStateHandlers, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeFilterBy } from './actions';

const enhanceNormalMode = compose(
  connect(
    (state) => ({
      initSearchText: state.threads.filterBy.title || '',
    }),
    (dispatch) => bindActionCreators({ changeFilterBy }, dispatch),
  ),
  withState('searchText', 'setSearchText', (props) => props.initSearchText),
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
  mapProps(({ storeTitle, searchText, setSearchText, changeFilterBy, ...rest }) => rest),
);

const enhanceAdvanceMode = compose(
  connect(
    (state) => {
      const {
        threads: {
          filterBy: { channelId, ...filterBy },
        },
      } = state;
      return {
        storeFilterBy: filterBy,
      };
    },
    (dispatch) => bindActionCreators({ changeFilterBy }, dispatch),
  ),
  withStateHandlers(
    (props) => ({
      localFilterBy: { ...props.storeFilterBy },
    }),
    {
      onChangeFilter: ({ localFilterBy }) => (key, value) => ({
        localFilterBy: { ...localFilterBy, [key]: value },
      }),
    },
  ),
  withHandlers({
    onSearch: (props) => () => {
      props.changeFilterBy(props.localFilterBy);
    },
  }),
  mapProps(({ filterBy, changeFilterBy, ...rest }) => rest),
);

const mapToggleSearchModeProps = mapProps(({ toggleSearchMode }) => ({
  toggleSearchMode,
}));

const enhance = compose(
  withStateHandlers(
    {
      searchMode: 'normal',
    },
    {
      toggleSearchMode: ({ searchMode }) => () => ({
        searchMode: searchMode === 'normal' ? 'advance' : 'normal',
      }),
    },
  ),
  branch(
    (props) => props.searchMode === 'normal',
    renderComponent(compose(mapToggleSearchModeProps, enhanceNormalMode)(ThreadSearchNormal)),
    renderComponent(compose(mapToggleSearchModeProps, enhanceAdvanceMode)(ThreadSearchAdvance)),
  ),
);

export default enhance(() => null);
