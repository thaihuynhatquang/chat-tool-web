import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import configureStore from 'configs/store';
import 'configs/axios';
import 'styles';

const rootElement = document.getElementById('root');

rootElement &&
  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
    rootElement,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
