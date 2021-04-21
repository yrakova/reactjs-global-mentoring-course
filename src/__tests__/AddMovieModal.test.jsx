import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import AddMovieModal from '../components/modals/AddMovieModal/AddMovieModal';
import configureStore from 'redux-mock-store';
import {
  MOVIES_INITIAL_STATE,
  SEARCH_INITIAL_STATE,
} from '../store/initial-state';
import { mockMovies } from './test-mock-data';
import { Provider } from 'react-redux';

const stateInitial = {
  moviesReducer: MOVIES_INITIAL_STATE,
  searchReducer: SEARCH_INITIAL_STATE,
};

describe('Add/Edit Movie Modal', () => {
  const mockStore = configureStore([]);
  const mockAction = jest.fn();
  let store;
  beforeEach(() => {
    store = mockStore(stateInitial);
  });
  test('AddMovie is shown', () => {
    const { queryByText, queryByRole } = render(
      <AddMovieModal show={true} onAction={mockAction} />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );
    const addMovieModal = queryByText('Add Movie');
    expect(addMovieModal).not.toBeNull();
    const btnSubmit = queryByRole('button', { name: /SUBMIT/i });
    expect(btnSubmit).not.toBeNull();
    const btnSave = queryByRole('button', { name: /SAVE/i });
    expect(btnSave).toBeNull();
  });

  test('EditMovie is shown', () => {
    const mockMovie = mockMovies[0];
    const { queryByText, queryByRole } = render(
      <AddMovieModal
        show={true}
        isEdit
        onAction={mockAction}
        movie={mockMovie}
      />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );
    const editMovieModal = queryByText('Edit Movie');
    expect(editMovieModal).not.toBeNull();
    const btnSubmit = queryByRole('button', { name: /SUBMIT/i });
    expect(btnSubmit).toBeNull();
    const btnSave = queryByRole('button', { name: /SAVE/i });
    expect(btnSave).not.toBeNull();
  });
  test('Add Movie Modal is hidden', () => {
    const { queryByText } = render(
      <AddMovieModal show={false} onAction={mockAction} />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );
    const addMovieModal = queryByText('Add Movie');
    expect(addMovieModal).toBeNull();
  });

  test('Edit Movie Modal is hidden', () => {
    const mockMovie = mockMovies[0];
    const { queryByText } = render(
      <AddMovieModal
        show={false}
        onAction={mockAction}
        isEdit
        movie={mockMovie}
      />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );
    const editMovieModal = queryByText('Edit Movie');
    expect(editMovieModal).toBeNull();
  });

  describe('Add Movie validation', () => {
    let btnSubmit, btnReset;
    beforeEach(() => {
      render(<AddMovieModal show={true} onAction={mockAction} />, {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      });

      btnSubmit = screen.queryByRole('button', { name: /submit/i });
      btnReset = screen.queryByRole('button', { name: /reset/i });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('RESET/SUBMIT enabled/disabled', async () => {
      expect(btnSubmit).toBeDisabled();
      expect(btnReset).toBeDisabled();

      await waitFor(() =>
        userEvent.type(screen.getByLabelText(/Title/i), 'Some Movie Title')
      );
      expect(btnSubmit).not.toBeDisabled();
      expect(btnReset).not.toBeDisabled();
    });

    test('SUBMIT refuse', async () => {
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(/Poster URL/i), '123');
        userEvent.click(btnSubmit);
      });
      await waitFor(() => expect(mockAction).not.toBeCalled());
    });

    test('SUBMIT success', async () => {
      userEvent.type(screen.getByLabelText(/Title/i), 'Some Title');
      userEvent.type(
        screen.getByLabelText(/Poster URL/i),
        'http://123.com/image.jpg'
      );
      userEvent.type(screen.getByLabelText(/Runtime/i), '120');
      userEvent.type(screen.getByLabelText(/Overview/i), 'Some overview');
      userEvent.type(screen.getByLabelText(/Release Date/i), '2021-04-19');
      await selectEvent.select(screen.getByLabelText(/GENRE/i), [
        'Adventure',
        'Drama',
      ]);

      userEvent.click(btnSubmit);

      await waitFor(() =>
        expect(mockAction).toHaveBeenCalledWith(
          'create',
          expect.objectContaining({
            title: 'Some Title',
            poster_path: 'http://123.com/image.jpg',
            runtime: 120,
            overview: 'Some overview',
            release_date: '2021-04-19',
            genres: ['Adventure', 'Drama'],
          })
        )
      );
    });
  });

  describe('Edit movie validation', () => {
    let btnSave, btnReset, mockMovie;
    beforeEach(() => {
      mockMovie = mockMovies[0];

      render(
        <AddMovieModal
          show={true}
          onAction={mockAction}
          isEdit
          movie={mockMovie}
        />,
        {
          wrapper: ({ children }) => (
            <Provider store={store}>{children}</Provider>
          ),
        }
      );

      btnSave = screen.queryByRole('button', { name: /save/i });
      btnReset = screen.queryByRole('button', { name: /reset/i });
    });

    test('EDIT renders movie', () => {
      expect(screen.getByLabelText(/Title/i)).toHaveValue(mockMovie.title);
      expect(screen.getByLabelText(/Poster URL/i)).toHaveValue(mockMovie.poster_path);
      expect(screen.getByLabelText(/Runtime/i)).toHaveValue(mockMovie.runtime);
      expect(screen.getByLabelText(/Overview/i)).toHaveValue(mockMovie.overview);
      expect(screen.getByLabelText(/Release Date/i)).toHaveValue(mockMovie.release_date);      
      expect(screen.queryByTestId(/genres/i).children[1]).toHaveTextContent(mockMovie.genres.join(''));      
    });

    test('SAVE success', async () => {
      const newTitle = mockMovie.title + ' 123';
      userEvent.clear(screen.getByLabelText(/Title/i));
      userEvent.type(screen.getByLabelText(/Title/i), newTitle);
      userEvent.click(btnSave);
      await waitFor(() =>
        expect(mockAction).toHaveBeenCalledWith(
          'update',
          expect.objectContaining({
            ...mockMovie,
            title: newTitle
          })
        )
      );
    })
  });
});
