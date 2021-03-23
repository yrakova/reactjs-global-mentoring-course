import { combineReducers } from 'redux';
import moviesReducer from './reducers/movies-reducer';
import settingsReducer from './reducers/settings-reducer';

export default combineReducers({
  moviesReducer,
  settingsReducer,
});
