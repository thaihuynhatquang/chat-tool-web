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
      window.location.href = `${process.env.REACT_APP_IAM_SERVER_URL || ''}/web/logout?redirect_url=${
        window.location.href
      }`;
    },
  }),
);

export default enhance(User);
