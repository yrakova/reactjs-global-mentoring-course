import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MoviePage.module.scss';
import {
  getMovie,
  resetSelectedMovie,
} from '../../store/actions/movies-actions';
import MovieDetails from '../../components/MovieDetails';
import Page404 from '../Page404';

const MoviePage = () => {
  const { id: movieId } = useParams();

  const selectedMovie = useSelector(
    (state) => state.moviesReducer.selectedMovie
  );

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedMovie) {
      setIsLoading(true);
      dispatch(getMovie(movieId)).then(() => {
        setIsLoading(false);
      });
    }
    return () => dispatch(resetSelectedMovie());
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

MoviePage.initialActions = ({ id: movieId }) => [getMovie(movieId)];

export default MoviePage;
