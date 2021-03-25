import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MovieCardErrorBoundary from '~/components/error-boundaries/MovieCardErrorBoundary';
import MovieCard from '~/components/MovieCard';
import DeleteMovieModal from '../../modals/DeleteMovieModal';
import AddMovieModal from '../../modals/AddMovieModal';
import { getMovies, deleteMovie } from '../../../store/actions-creator';

const getMovieById = (id, movies) => movies.find((movie) => movie.id === id);

const MovieList = ({ movies, fetchMovies, deleteMovie }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

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

  const resetState = () => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setCurrentMovieId(null);
  };

  const onDeleteFormAction = (action, movieId) => {
    switch (action) {
      case 'confirm':
        deleteMovie(movieId);
        resetState();
        break;
      case 'close':
        resetState();
        break;
      default:
        throw new Error(`Unknown action from Delete From: ${action}`);
    }
  };

  const onEditFormAction = () => {
    resetState();
  };

  return (
    <>
      {movies.map((movie) => (
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
        movie={getMovieById(currentMovieId, movies)}
      />
    </>
  );
};

MovieList.propTypes = {};

MovieList.defaultProps = {};

const mapStateToProps = (state) => ({
  movies: state.moviesReducer.movies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(getMovies()),
  deleteMovie: (movieId) => dispatch(deleteMovie(movieId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
