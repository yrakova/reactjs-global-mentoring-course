import { GET_MOVIES, NETWORK_PROVIDER_RESOLUTION } from './movies-action-types';

const SERVER_URI = 'http://localhost:4000';

const generateFullEndpoint = (endpoint) => SERVER_URI + endpoint;

export const REQUEST_MOVIES = () => ({
  type: GET_MOVIES,
  endpoint: '/movies',
  method: 'GET',
});

export const RECEIVE_MOVIES = (movies) => ({
  type: GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movies,
});

export const getMovies = () => (dispatch) => {
  const requestMoviesAction = REQUEST_MOVIES();
  dispatch(requestMoviesAction);
  return fetch(generateFullEndpoint(requestMoviesAction.endpoint))
    .then((response) => response.json(),
      (error) => console.log('An error occurred.', error))
    .then((json) => {
      const movies = json.data;
      dispatch(RECEIVE_MOVIES(movies));
    });
};
