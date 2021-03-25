import { INITIAL_STATE } from '../initial-state';
import {
  GET_MOVIES, NETWORK_PROVIDER_RESOLUTION, DELETE_MOVIE,
} from '../movies-action-types';

export default (state = INITIAL_STATE, action) => {
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
