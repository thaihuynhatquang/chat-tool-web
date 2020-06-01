import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from 'configs/rootReducer';
import socket from 'configs/socket';
import socketHandler from 'socket';
import { isDevelopment } from 'shared/utils';
import { keepCustomersNoteAndTagInfo } from 'shared/middlewares';

const composeEnhancers = isDevelopment ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(keepCustomersNoteAndTagInfo)));
socketHandler(socket)(store);

export default () => store;
