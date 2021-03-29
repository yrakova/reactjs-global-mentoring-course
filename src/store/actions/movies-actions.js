import {
  GET_MOVIES,
  NETWORK_PROVIDER_RESOLUTION,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  CREATE_MOVIE,
} from './movies-action-types';

const BASE_URL = 'http://localhost:4000';

const generateFullEndpoint = (endpoint) => BASE_URL + endpoint;

const getHeaders = (method) => {
  const h = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    h['Content-Type'] = 'application/json';
  }
  return h;
};

const getConfig = (method = 'GET', payload) => ({
  method,
  body:
    payload
    && (typeof payload === 'string' ? payload : JSON.stringify(payload)),
  headers: getHeaders(method),
});

// GET MOVIES...
export const REQUEST_MOVIES = ({
  limit,
  offset,
  sortBy,
  sortOrder,
  filters,
}) => ({
  type: GET_MOVIES,
  endpoint: `/movies?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filters.toString()}`,
  method: 'GET',
});

export const RECEIVE_MOVIES = (movies) => ({
  type: GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movies,
});

export const getMovies = () => (dispatch, getState) => {
  const {
    limit,
    offset,
    sortBy,
    sortOrder,
    filters,
  } = getState().searchReducer;
  const action = REQUEST_MOVIES({
    limit,
    offset,
    sortBy,
    sortOrder,
    filters,
  });
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...getConfig(action.method, action.payload),
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
    ...getConfig(action.method, action.payload),
  })
    .then((response) => {
      if (response.ok) {
        dispatch(RESOLVED_DELETE_MOVIE(movieId));
        dispatch(getMovies());
      } else {
        alert(`Can't delete movie with id ${movieId}`);
        dispatch(FAILED_DELETE_MOVIE(movieId));
      }
    })
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
    ...getConfig(action.method, action.payload),
  })
    .then((response) => {
      if (response.ok) {
        alert('Movie is successfully updated');
        dispatch(RESOLVED_UPDATE_MOVIE(movieId));
      } else {
        return response.json().then((json) => {
          const errorText = `Can't update movie ${movie.id}:${json.messages.map(
            (msg) => `\n- ${msg}`,
          )}`;
          return Promise.reject(errorText);
        });
      }
    })
    .catch((error) => {
      alert(error);
      dispatch(FAILED_UPDATE_MOVIE(movieId));
      return Promise.reject(error);
    });
};
// ...UPDATE MOVIE

// CREATE MOVIE...
export const REQUEST_CREATE_MOVIE = (movie) => ({
  type: CREATE_MOVIE,
  endpoint: '/movies',
  method: 'POST',
  payload: movie,
});

export const RESOLVED_CREATE_MOVIE = () => ({
  type: CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
});

export const FAILED_CREATE_MOVIE = () => ({
  type: CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED,
});

export const createMovie = (movie) => (dispatch) => {
  const action = REQUEST_CREATE_MOVIE(movie);
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...getConfig(action.method, action.payload),
  })
    .then((response) => {
      if (response.ok) {
        dispatch(RESOLVED_CREATE_MOVIE());
        alert('Movie is successfully created');
        dispatch(getMovies());
      } else {
        return response.json().then((json) => {
          const errorText = `Can't create movie ${
            movie.title
          }:${json.messages.map((msg) => `\n- ${msg}`)}`;
          return Promise.reject(errorText);
        });
      }
    })
    .catch((error) => {
      alert(error);
      dispatch(FAILED_CREATE_MOVIE());
      return Promise.reject(error);
    });
};
// ...CREATE MOVIE
