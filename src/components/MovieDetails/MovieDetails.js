import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './MovieDetails.module.scss';
import zoomIcon from '~/assets/images/magnifying_glass.svg';
import { MoviePropTypes } from '~/utils/CommonPropTypes';

const calcRatingStyle = (rating) => {
  if (rating >= 8) {
    return styles.rating__high;
  }
  if (rating >= 5) {
    return styles.rating__medium;
  }
  return styles.rating__low;
};

const MovieDetails = ({ movie, onBack }) => {
  const {
    poster_path, title, overview: description, release_date, runtime, vote_average: rating,
  } = movie;

  const year = new Date(release_date).getFullYear();

  const ratingStyle = useCallback(calcRatingStyle(rating), [rating]);

  return (
    <div className={styles.MovieDetails}>
      <div className={styles.imgContainer}>
        <img className={styles.poster} src={poster_path} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.row}>
          <p className={styles.title}>{title}</p>
          <div className={styles.circleContainer}>
            <span className={styles.circle}>
              <p className={`${styles.rating} ${ratingStyle}`}>{rating}</p>
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.year}>{year}</p>
          <p className={styles.runtime}>
            {runtime}
            {' '}
            min
          </p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <button className={styles.btnZoom} onClick={onBack}>
        <img src={zoomIcon} />
      </button>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: MoviePropTypes.isRequired,
  onBack: PropTypes.func,
};

MovieDetails.defaultProps = {
  onBack: () => {},
};

export default MovieDetails;
