import moviesReducer from '~/store/reducers/movies-reducer';
import { MOVIES_INITIAL_STATE } from '../store/initial-state';
import * as types from '../store/actions/movies-action-types';
import { mockMovies } from './test-mock-data';

const stateInitial = MOVIES_INITIAL_STATE;

describe('movies-reducer', () => {
  test('it should return the default state, when it is undefined and no action passed', () => {
    expect(moviesReducer(undefined, { type: '' })).toStrictEqual(stateInitial);
  });

  it('should return the state object when no action is passed', () => {
    expect(moviesReducer(stateInitial, { type: '' })).toBe(stateInitial);
  });

  describe('GET_MOVIES', () => {
    test('GET_MOVIES fetching', () => {
      expect(
        moviesReducer(stateInitial, { type: types.GET_MOVIES })
      ).toStrictEqual({ ...stateInitial, isFetching: true });
    });

    test('GET_MOVIES failed', () => {
      const state = { ...stateInitial, isFetching: true };
      expect(
        moviesReducer(state, {
          type: types.GET_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.FAILED,
        })
      ).toStrictEqual({ ...state, isFetching: false });
    });

    test('GET_MOVIES resolved with empty list', () => {
      const state = { ...stateInitial, isFetching: true };
      const action = {
        type: types.GET_MOVIES + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        payload: [],
      };
      const newState = moviesReducer(state, action);
      const correctNewState = {
        ...state,
        isFetching: false,
        movies: [],
      };
      expect(newState).toStrictEqual(correctNewState);
    });

    test('GET_MOVIES resolved', () => {
      const state = { ...stateInitial, isFetching: true };
      const action = {
        type: types.GET_MOVIES + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        payload: mockMovies,
      };
      const newState = moviesReducer(state, action);
      const correctNewState = {
        ...state,
        isFetching: false,
        movies: mockMovies,
      };
      expect(newState).toStrictEqual(correctNewState);
    });
  });

  describe('GET_MOVIE', () => {
    test('GET_MOVIE fetching', () => {
      expect(
        moviesReducer(stateInitial, { type: types.GET_MOVIE })
      ).toStrictEqual({ ...stateInitial, isFetching: true });
    });

    test('GET_MOVIE failed', () => {
      const state = { ...stateInitial, isFetching: true };
      expect(
        moviesReducer(stateInitial, {
          type: types.GET_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.FAILED,
        })
      ).toStrictEqual({ ...state, isFetching: false });
    });

    test('GET_MOVIE received', () => {
      const state = { ...stateInitial, isFetching: true };
      const expectedSelectedMovie = mockMovies[0];
      const action = {
        type: types.GET_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        payload: expectedSelectedMovie,
      };
      const newState = moviesReducer(state, action);
      const correctNewState = {
        ...stateInitial,
        selectedMovie: expectedSelectedMovie,
      };
      expect(newState).toStrictEqual(correctNewState);
    });
  });

  describe('UPDATE_MOVIE', () => {
    const updatingMovie = { ...mockMovies[0], title: 'NewTitle' };
    test('UPDATE_MOVIE submitting', () => {
      expect(
        moviesReducer(stateInitial, {
          type: types.UPDATE_MOVIE,
          payload: updatingMovie,
        })
      ).toStrictEqual({
        ...stateInitial,
        updatingMovie: updatingMovie,
        isSubmitting: true,
      });
    });

    test('UPDATE_MOVIE failed', () => {
      const state = {
        ...stateInitial,
        isSubmitting: true,
        updatingMovie: updatingMovie,
      };
      expect(
        moviesReducer(state, {
          type: types.UPDATE_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.FAILED,
        })
      ).toStrictEqual({ ...state, isSubmitting: false, updatingMovie: null });
    });
    test('UPDATE_MOVIE resolved', () => {
      const state = {
        ...stateInitial,
        isSubmitting: true,
        updatingMovie: updatingMovie,
        movies: mockMovies,
      };
      const action = {
        type: types.UPDATE_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        payload: updatingMovie.id,
      };
      const newState = moviesReducer(state, action);

      const correctNewState = {
        ...state,
        updatingMovie: null,
        isSubmitting: false,
        movies: [updatingMovie, ...mockMovies.slice(1)],
      };
      expect(newState).toStrictEqual(correctNewState);
    });
  });

  describe('DELETE_MOVIE', () => {
    const deletingMovie = mockMovies[0];
    test('DELETE_MOVIE submitting', () => {
      const state = {
        ...stateInitial,
        movies: mockMovies,
      };
      expect(
        moviesReducer(state, {
          type: types.DELETE_MOVIE,
          payload: deletingMovie.id,
        })
      ).toStrictEqual({ ...state, isSubmitting: true });
    });

    test('DELETE_MOVIE failed', () => {
      const state = {
        ...stateInitial,
        isSubmitting: true,
        movies: mockMovies,
      };
      expect(
        moviesReducer(state, {
          type: types.DELETE_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.FAILED,
        })
      ).toStrictEqual({ ...state, isSubmitting: false });
    });
    test('DELETE_MOVIE resolved', () => {
      const state = {
        ...stateInitial,
        isSubmitting: true,
        movies: mockMovies,
      };
      const action = {
        type: types.DELETE_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        payload: deletingMovie.id,
      };
      const newState = moviesReducer(state, action);

      const correctNewState = {
        ...state,
        isSubmitting: false,
        movies: [...mockMovies.slice(1)],
      };
      expect(newState).toStrictEqual(correctNewState);
    });

    test('DELETE_MOVIE resolved when movies are empty', () => {
      const state = {
        ...stateInitial,
        isSubmitting: true,
        movies: [],
      };
      const action = {
        type: types.DELETE_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        payload: deletingMovie.id,
      };
      const newState = moviesReducer(state, action);

      const correctNewState = {
        ...state,
        isSubmitting: false,
        movies: [],
      };
      expect(newState).toStrictEqual(correctNewState);
    });
  });

  describe('CREATE_MOVIE', () => {
    it('CREATE_MOVIE resolved', () => {
        const state = {
          ...stateInitial,
          isSubmitting: true,
          movies: mockMovies,
        };
        const action = {
          type: types.CREATE_MOVIE + types.NETWORK_PROVIDER_RESOLUTION.RESOLVED,
        };
        const newState = moviesReducer(state, action);
        expect(newState).toStrictEqual({...state, isSubmitting: false});
      });
  })  
});
