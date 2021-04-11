import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './MoviePage.module.scss';
import {
  getMovie,
  resetSelectedMovie,
} from '../../store/actions/movies-actions';
import MovieDetails from '../../components/MovieDetails';
import Page404 from '../Page404';

const MoviePage = ({ fetchMovie, reset, selectedMovie }) => {
  const { id: movieId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovie(movieId).then(() => {
      setIsLoading(false);
    });
    return () => reset();
  }, []);

  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  const getBlock = () => {
    if (isLoading) {
      return <>Loading...</>;
    }

    if (selectedMovie) {
      return <MovieDetails movie={selectedMovie} onBack={onBack} />;
    }

    return <Page404 />;
  };

  return <div className={styles.MoviePage}>{getBlock()}</div>;
};

const mapStateToProps = (state) => ({
  selectedMovie: state.moviesReducer.selectedMovie,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovie: (movieId) => dispatch(getMovie(movieId)),
  reset: () => dispatch(resetSelectedMovie()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
