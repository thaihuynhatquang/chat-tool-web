import { connect } from 'react-redux';
import {
  branch,
  compose,
  mapProps,
  renderComponent,
  renderNothing,
  withHandlers,
  withState,
  withStateHandlers,
} from 'recompose';
import { bindActionCreators } from 'redux';
import { withToggle } from 'shared/hooks';
import { changeFilterBy } from './actions';
import ThreadSearchAdvance from './components/Advance';
import ThreadSearchNormal from './components/Normal';

const enhanceNormalMode = compose(
  connect(
    (state) => ({
      initSearchText: state.filterThreadsBy.title || '',
    }),
    (dispatch) => bindActionCreators({ changeFilterBy }, dispatch),
  ),
  withState('searchText', 'setSearchText', (props) => props.initSearchText),
  withHandlers({
    onChangeSearchText: (props) => (e) => {
      props.setSearchText(e.target.value.trim());
    },
    onKeyDownSearch: (props) => (e) => {
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
      const { filterThreadsBy } = state;
      return {
        storeFilterBy: filterThreadsBy,
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

const mapToggleSearchModeProps = mapProps(({ toggleNormalMode }) => ({
  toggleSearchMode: toggleNormalMode,
}));

const enhance = compose(
  withToggle('normalMode', true),
  branch(
    (props) => props.isNormalModeShow,
    renderComponent(compose(mapToggleSearchModeProps, enhanceNormalMode)(ThreadSearchNormal)),
    renderComponent(compose(mapToggleSearchModeProps, enhanceAdvanceMode)(ThreadSearchAdvance)),
  ),
);

export default enhance(renderNothing);
