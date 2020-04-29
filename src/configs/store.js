import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from 'configs/rootReducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default () => store;
