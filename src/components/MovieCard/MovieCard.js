import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import MovieOptionsPopup from '../MovieOptionsPopup/MovieOptionsPopup';
import { MoviePropTypes } from '~/utils/CommonPropTypes';

const MovieCard = ({ movie, optionsHandler }) => {
  const {
    title, release_date, poster_path, id, genres,
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

  const [showOptionsPopup, setShowOptionsPopup] = useState(false);

  const history = useHistory();

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

  const openMoviePage = () => {
    history.push(`/film/${id}`);
  };

  return (
    <>
      <div className={styles.MovieCard} onClick={openMoviePage} role="button">
        <div className={styles.imgContainer}>
          <img src={poster_path} />
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
        <div className={styles.genresContainer}>
          {genres && genres.join(', ')}
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
