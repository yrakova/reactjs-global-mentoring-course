import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './MovieDetails.module.scss';
import zoomIcon from '~/assets/images/magnifying_glass.svg';

const MovieDetails = ({ movie, onBack }) => {
  const {
    posterUri, title, description, year, runtime, rating,
  } = movie;

  const ratingStyle = useMemo(() => {
    if (rating >= 4.8) {
      return styles.rating__high;
    }
    if (rating >= 4.5) {
      return styles.rating__medium;
    }
    return styles.rating__low;
  }, [rating]);

  return (
    <div className={styles.MovieDetails}>
      <div className={styles.imgContainer}>
        <img className={styles.poster} src={posterUri} />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.circleContainer}>
          <span className={styles.circle}>
            <p className={`${styles.rating} ${ratingStyle}`}>{rating}</p>
          </span>
        </div>
      </div>
      <button className={styles.btnZoom} onClick={onBack}>
        <img src={zoomIcon} />
      </button>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    posterUri: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }).isRequired,
  onBack: PropTypes.func,
};

MovieDetails.defaultProps = {
  onBack: () => {},
};

export default MovieDetails;
