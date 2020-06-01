import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, branch, renderNothing } from 'recompose';
import * as actions from './actions';
import User from './components/User';
import * as storeGetter from 'shared/getEntities';

const mapState = (state) => ({ user: storeGetter.getUser(state) });
const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.user, renderNothing),
);

export default enhance(User);
