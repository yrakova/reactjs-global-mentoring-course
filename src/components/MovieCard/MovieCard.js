import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.scss';
import MovieOptionsPopup from '../MovieOptionsPopup/MovieOptionsPopup';
import MovieContext from '../../MovieContext';
import { MoviePropTypes } from '~/utils/CommonPropTypes';

const MovieCard = ({ movie, optionsHandler }) => {
  const {
    title, year, posterUri, id,
  } = movie;

  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const { setSelectedMovie } = useContext(MovieContext);

  const hideOptionsPopup = () => {
    setShowOptionsPopup(false);
  };

  const onOptionsPopupAction = (action) => {
    optionsHandler(action, id);
    hideOptionsPopup();
  };

  const toggleOptionsPopup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptionsPopup(!showOptionsPopup);
  };

  return (
    <>
      <div className={styles.MovieCard} onClick={() => setSelectedMovie(movie)} role="button">
        <div className={styles.imgContainer}>
          <img src={posterUri} />
          <button
            className={styles.btnOptions}
            onClick={toggleOptionsPopup}
          >
            ...
          </button>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.title}>{title}</p>
          <p className={styles.year}>{year}</p>
        </div>
        <div className={styles.optionsContainer}>
          <MovieOptionsPopup
            show={showOptionsPopup}
            onAction={onOptionsPopupAction}
          />
        </div>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  movie: MoviePropTypes.isRequired,
  optionsHandler: PropTypes.func,
};

MovieCard.defaultProps = {
  optionsHandler: () => {},
};

export default MovieCard;
