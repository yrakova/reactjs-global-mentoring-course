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
        isFetching: true,
      };
    case GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
      return {
        ...state,
        isFetching: false,
        movies: action.payload,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        isSubmitting: true,
      };
    case DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
      return {
        ...state,
        isSubmitting: false,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        updatingMovie: action.payload,
        isSubmitting: true,
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
        isSubmitting: false,
      };
    case CREATE_MOVIE:
      return {
        ...state,
        updatingMovie: action.payload,
        isSubmitting: true,
      };
    case CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED:
    case CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED:
      return {
        ...state,
        updatingMovie: null,
        isSubmitting: false,
      };
    case UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED:
    case DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED:
    case GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.FAILED:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
