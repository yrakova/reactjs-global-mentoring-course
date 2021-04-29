import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const reduxDevTools = typeof window !== "undefined" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
const composeEnhancers = reduxDevTools || compose;

const enhancers = composeEnhancers(applyMiddleware(thunkMiddleware));

export default () => {
  return createStore(reducers, enhancers);
};
