import React from 'react';
import MovieCardErrorBoundary from '~/components/error-boundaries/MovieCardErrorBoundary';
import MovieCard from '~/components/MovieCard';
import { mockMoviesData } from '~/services/mock-data';
import DeleteMovieModal from '../../modals/DeleteMovieModal';
import AddMovieModal from '../../modals/AddMovieModal';

const getMovieById = (id) => mockMoviesData.movies.find((movie) => movie.id === id);

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      showDeleteForm: false,
      selectedMovieId: null,
    };

    this.optionsHandler = this.optionsHandler.bind(this);
    this.onDeleteFormAction = this.onDeleteFormAction.bind(this);
    this.onEditFormAction = this.onEditFormAction.bind(this);
  }

  optionsHandler(action, movieId) {
    this.setState({ selectedMovieId: movieId });
    switch (action) {
      case 'edit':
        this.setState({ showEditForm: true });
        break;
      case 'delete':
        this.setState({ showDeleteForm: true });
        break;
      case 'close':
        break;
      default:
        throw new Error(`Unknown action ${action}`);
    }
  }

  onDeleteFormAction(action, movieId) {
    switch (action) {
      case 'confirm':
        alert(`Movie ${movieId} to be deleted!`);
        this.setState({ showDeleteForm: false, selectedMovieId: null });
        break;
      case 'close':
        this.setState({ showDeleteForm: false, selectedMovieId: null });
        break;
      default:
        throw new Error(`Unknown action from Delete From: ${action}`);
    }
  }

  onEditFormAction(action, movieId) {
    this.setState({ showEditForm: false, selectedMovieId: null });
  }

  render() {
    const { showEditForm, showDeleteForm, selectedMovieId } = this.state;
    return (
      <>
        {mockMoviesData.movies.map((movie) => (
          <MovieCardErrorBoundary key={movie.id}>
            <MovieCard movie={movie} optionsHandler={this.optionsHandler} />
          </MovieCardErrorBoundary>
        ))}
        <DeleteMovieModal
          show={showDeleteForm}
          onAction={this.onDeleteFormAction}
          movieId={selectedMovieId}
        />
        <AddMovieModal
          isEdit
          show={showEditForm}
          onAction={this.onEditFormAction}
          movie={getMovieById(selectedMovieId)}
        />
      </>
    );
  }
}

MovieList.propTypes = {};

MovieList.defaultProps = {};

export default MovieList;
