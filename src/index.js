import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'configs/axios';
import configureStore from 'configs/store';
import 'styles';
import App from 'blocks/app';
import StockChecking from 'blocks/stockChecking';
import ErrorBoundary from 'shared/components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';
import * as serviceWorker from 'serviceWorker';
import GeneralSettings from 'blocks/configChannel/generalSettings';
import UserRole from 'blocks/configChannel/userRole';
import withConfigChannelLayout from 'blocks/configChannel';
import { withFetcher } from 'shared/hooks';
import { compose } from 'recompose';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { fetchCurrentUserSucceed } from './blocks/app/actions';
import { CHANNEL_CONFIG_GENERAL_SETTINGS, CHANNEL_CONFIG_ROLES_AND_PERMISSIONS } from 'shared/constants';

const rootElement = document.getElementById('root');

const mapState = (state) => ({});
const mapDispatch = (dispatch) => bindActionCreators({ fetchCurrentUserSucceed }, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'user',
    async (props) => {
      try {
        const { data: userInfo } = await axios.get('/api/v1/users/me');
        props.fetchCurrentUserSucceed(userInfo);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          const iamUrl = process.env.REACT_APP_IAM_SERVER_URL;
          if (iamUrl) {
            window.location = `${iamUrl}/web/login?redirect_url=${window.location.href}`;
          }
        }
      }
    },
    { fetchOnMount: true },
  ),
);

const AppWrapper = enhance((props) => (
  <Router>
    <Fragment>
      <Route path='/' exact component={App} />
      <Route path='/stocks' exact component={StockChecking} />
      <Route
        path={`/channel/:channelId/${CHANNEL_CONFIG_GENERAL_SETTINGS}`}
        render={withConfigChannelLayout(GeneralSettings)}
      />
      <Route
        path={`/channel/:channelId/${CHANNEL_CONFIG_ROLES_AND_PERMISSIONS}`}
        render={withConfigChannelLayout(UserRole)}
      />
    </Fragment>
  </Router>
));

rootElement &&
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Fragment>
        <ErrorBoundary onError={(error, info) => toast.error(<small>Có gì đó sai sai: {error.message}</small>)}>
          <AppWrapper />
        </ErrorBoundary>
        <ToastContainer autoClose={7000} newestOnTop closeButton={false} progressClassName='toastify-progress-custom' />
      </Fragment>
    </Provider>,
    rootElement,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
