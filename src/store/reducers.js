import { combineReducers } from 'redux';
import moviesReducer from './reducers/movies-reducer';
import searchReducer from './reducers/search-reducer';

export default combineReducers({
  moviesReducer,
  searchReducer,
});
