import App from 'blocks/app';
import withConfigChannelLayout from 'blocks/configChannel';
import GeneralSettings from 'blocks/configChannel/generalSettings';
import UserRole from 'blocks/configChannel/userRole';
import { LoginScreen } from 'blocks/loginScreen';
import 'configs/axios';
import { accessToken, client } from 'configs/axios';
import configureStore from 'configs/store';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import * as serviceWorker from 'serviceWorker';
import ErrorBoundary from 'shared/components/ErrorBoundary';
import { CHANNEL_CONFIG_GENERAL_SETTINGS, CHANNEL_CONFIG_ROLES_AND_PERMISSIONS } from 'shared/constants';
import { withFetcher } from 'shared/hooks';
import 'styles';
import { fetchCurrentUserSucceed } from './blocks/app/actions';

const rootElement = document.getElementById('root');

const mapState = (state) => ({});
const mapDispatch = (dispatch) => bindActionCreators({ fetchCurrentUserSucceed }, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'user',
    async (props) => {
      try {
        const { data: userInfo } = await client.get('/api/v1/users/me');
        props.fetchCurrentUserSucceed(userInfo);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log(err);
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
    !!accessToken ? (
      <Provider store={configureStore()}>
        <Fragment>
          <ErrorBoundary onError={(error, info) => toast.error(<small>Có gì đó sai sai: {error.message}</small>)}>
            <AppWrapper />
          </ErrorBoundary>
          <ToastContainer
            autoClose={7000}
            newestOnTop
            closeButton={false}
            progressClassName='toastify-progress-custom'
          />
        </Fragment>
      </Provider>
    ) : (
      <LoginScreen />
    ),
    rootElement,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
