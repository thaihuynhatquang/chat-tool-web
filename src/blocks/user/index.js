import User from './components/User';
import { compose, branch, renderNothing, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import * as storeGetter from 'shared/getEntities';

const mapState = (state) => ({ user: storeGetter.getUser(state) });
const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withStateHandlers(
    { isShowNav: false },
    {
      toggleNav: ({ isShowNav }) => (e) => {
        e.preventDefault();
        return { isShowNav: !isShowNav };
      },
    },
  ),
  branch((props) => !props.user, renderNothing),
);

export default enhance(User);
