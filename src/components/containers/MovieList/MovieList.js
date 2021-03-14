import React, { useState } from 'react';
import MovieCardErrorBoundary from '~/components/error-boundaries/MovieCardErrorBoundary';
import MovieCard from '~/components/MovieCard';
import { mockMoviesData } from '~/services/mock-data';
import DeleteMovieModal from '../../modals/DeleteMovieModal';
import AddMovieModal from '../../modals/AddMovieModal';

const getMovieById = (id) => mockMoviesData.movies.find((movie) => movie.id === id);

const MovieList = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  const optionsHandler = (action, movieId) => {
    setCurrentMovieId(movieId);
    switch (action) {
      case 'edit':
        setShowEditForm(true);
        break;
      case 'delete':
        setShowDeleteForm(true);
        break;
      case 'close':
        break;
      default:
        throw new Error(`Unknown action ${action}`);
    }
  };

  const onDeleteFormAction = (action, movieId) => {
    switch (action) {
      case 'confirm':
        alert(`Movie ${movieId} to be deleted!`);
        setShowDeleteForm(false);
        setCurrentMovieId(null);
        break;
      case 'close':
        setShowDeleteForm(false);
        setCurrentMovieId(null);
        break;
      default:
        throw new Error(`Unknown action from Delete From: ${action}`);
    }
  };

  const onEditFormAction = (action, movieId) => {
    setShowEditForm(false);
    setCurrentMovieId(null);
  };

  return (
    <>
      {mockMoviesData.movies.map((movie) => (
        <MovieCardErrorBoundary key={movie.id}>
          <MovieCard movie={movie} optionsHandler={optionsHandler} />
        </MovieCardErrorBoundary>
      ))}
      <DeleteMovieModal
        show={showDeleteForm}
        onAction={onDeleteFormAction}
        movieId={currentMovieId}
      />
      <AddMovieModal
        isEdit
        show={showEditForm}
        onAction={onEditFormAction}
        movie={getMovieById(currentMovieId)}
      />
    </>
  );
};

MovieList.propTypes = {};

MovieList.defaultProps = {};

export default MovieList;
