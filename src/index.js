import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'configs/axios';
import configureStore from 'configs/store';
import 'styles';
import App from 'blocks/app';
import * as serviceWorker from 'serviceWorker';
import { isSignedIn } from 'configs/axios';
import { GoogleLogin } from 'react-google-login';
import vars from 'vars';

const responseGoogle = (response) => {
  console.log(response);
  const accessToken = response.tc.id_token;
  document.cookie = `access_token=${accessToken}`;
};

const rootElement = document.getElementById('root');
console.log(vars.CLIENT_ID);
rootElement &&
  ReactDOM.render(
    isSignedIn ? (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    ) : (
      <GoogleLogin
        clientId={vars.CLIENT_ID}
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={'single_host_origin'}
      />
    ),
    rootElement,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
