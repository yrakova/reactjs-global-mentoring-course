import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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

describe('AddMovieModal', () => {
  const mockStore = configureStore([]);
  describe('Add movie', () => {
    let store;
    beforeEach(() => {
      store = mockStore(stateInitial);
    });
    test('it is shown', () => {
      const mockAction = jest.fn();
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
    test('it is hidden', () => {
      const mockAction = jest.fn();
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

    describe('validation', () => {
      let btnSubmit, btnReset, mockAction;
      beforeEach(() => {
        mockAction = jest.fn();

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
  });

  describe('Edit movie', () => {});
});
