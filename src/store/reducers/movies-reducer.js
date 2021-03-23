import { INITIAL_STATE } from '../initial-state';
import {
  GET_MOVIES, NETWORK_PROVIDER_RESOLUTION,
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
    default:
      return state;
  }
};
