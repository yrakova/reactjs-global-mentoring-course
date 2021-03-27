import {
  GET_MOVIES, NETWORK_PROVIDER_RESOLUTION, DELETE_MOVIE, UPDATE_MOVIE, CREATE_MOVIE,
} from './movies-action-types';

const BASE_URL = 'http://localhost:4000';

const generateFullEndpoint = (endpoint) => BASE_URL + endpoint;

const headers = (method) => {
  const h = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (
    method === 'POST'
    || method === 'PUT'
    || method === 'PATCH'
    || method === 'DELETE'
  ) {
    h['Content-Type'] = 'application/json';
  }
  return h;
};

const config = (method = 'GET', payload) => ({
  method,
  body:
    payload
    && (typeof payload === 'string' ? payload : JSON.stringify(payload)),
  headers: headers(method),
});

// GET MOVIES...
export const REQUEST_MOVIES = ({ limit = 3, offset = 0 }) => ({
  type: GET_MOVIES,
  endpoint: `/movies?limit=${limit}&offset=${offset}`,
  method: 'GET',
});

export const RECEIVE_MOVIES = (movies) => ({
  type: GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movies,
});

export const getMovies = () => (dispatch, getState) => {
  const { options: { limit, offset } } = getState().moviesReducer;
  const action = REQUEST_MOVIES({ limit, offset });
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...config(action.method, action.payload),
  })
    .then(
      (response) => response.json(),
      (error) => console.log('An error occurred.', error),
    )
    .then((json) => {
      const movies = json.data;
      dispatch(RECEIVE_MOVIES(movies));
    });
};
// ...GET MOVIES

// DELETE MOVIE...
export const REQUEST_DELETE_MOVIE = (movieId) => ({
  type: DELETE_MOVIE,
  endpoint: `/movies/${movieId}`,
  method: 'DELETE',
});

export const RESOLVED_DELETE_MOVIE = (movieId) => ({
  type: DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movieId,
});

export const FAILED_DELETE_MOVIE = (movieId) => ({
  type: DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED,
  payload: movieId,
});

export const deleteMovie = (movieId) => (dispatch) => {
  const action = REQUEST_DELETE_MOVIE(movieId);
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...config(action.method, action.payload),
  })
    .then(
      (response) => {
        if (response.ok) {
          dispatch(RESOLVED_DELETE_MOVIE(movieId));
          dispatch(getMovies());
        } else {
          alert(`Can't delete movie with id ${movieId}`);
          dispatch(FAILED_DELETE_MOVIE(movieId));
        }
      },
    )
    .catch((error) => {
      alert(error);
      dispatch(FAILED_DELETE_MOVIE(movieId));
    });
};
// ...DELETE MOVIE

// UPDATE MOVIE...
export const REQUEST_UPDATE_MOVIE = (movie) => ({
  type: UPDATE_MOVIE,
  endpoint: '/movies',
  method: 'PUT',
  payload: movie,
});

export const RESOLVED_UPDATE_MOVIE = (movieId) => ({
  type: UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movieId,
});

export const FAILED_UPDATE_MOVIE = (movieId) => ({
  type: UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED,
  payload: movieId,
});

export const updateMovie = (movie) => (dispatch) => {
  const { id: movieId } = movie;
  const action = REQUEST_UPDATE_MOVIE(movie);
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...config(action.method, action.payload),
  })
    .then(
      (response) => {
        if (response.ok) {
          dispatch(RESOLVED_UPDATE_MOVIE(movieId));
        } else {
          alert(`Can't update movie with id ${movieId}`);
          dispatch(FAILED_UPDATE_MOVIE(movieId));
        }
      },
    )
    .catch((error) => {
      alert(error);
      dispatch(FAILED_UPDATE_MOVIE(movieId));
    });
};
// ...UPDATE MOVIE
