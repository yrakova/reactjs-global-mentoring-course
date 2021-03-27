import { MOVIES_INITIAL_STATE } from '../initial-state';
import {
  GET_MOVIES,
  NETWORK_PROVIDER_RESOLUTION,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  CREATE_MOVIE,
} from '../actions/movies-action-types';

export default (state = MOVIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
      return {
        ...state,
        movies: state.movies.filter((i) => i.id !== action.payload),
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        updatingMovie: action.payload,
        isLoading: true,
      };
    case UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
      const movieIndex = state.movies.findIndex(
        (movie) => movie.id === state.updatingMovie.id,
      );
      const movies = state.movies.slice();
      movies[movieIndex] = { ...state.updatingMovie };
      return {
        ...state,
        movies,
        isLoading: false,
      };
    case CREATE_MOVIE:
      return {
        ...state,
        updatingMovie: action.payload,
        isLoading: true,
      };
    case CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
    case CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED:
      return {
        ...state,
        updatingMovie: null,
        isLoading: false,
      };
    case UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED:
    case DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED:
    case GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
