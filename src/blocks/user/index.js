import { connect } from 'react-redux';
import { branch, compose, renderNothing, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import * as actions from './actions';
import User from './components/User';
import * as services from './services';

const mapState = (state) => ({ user: storeGetter.getMe(state) });
const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.user, renderNothing),
  withHandlers({
    updateUserInfo: (props) => async (updateInfo) => {
      const res = await services.updateUserInfo(updateInfo);
      props.updateUserInfoSucceed(res);
      return res;
    },
    logout: (props) => () => {
      document.cookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      window.location.href = `${process.env.REACT_APP_IAM_SERVER_URL || ''}`;
    },
  }),
);

export default enhance(User);
