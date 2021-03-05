import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.scss';

const MovieCard = ({ isBuggy, title, year, posterUri }) => {
  if (isBuggy) {
    throw new Error('random error');
  }

  return (
    <div className={styles.MovieCard}>
      <img src={posterUri} />
      <div className={styles.descriptionContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.year}>{year}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterUri: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  isBuggy: PropTypes.bool,
};

MovieCard.defaultProps = {
  isBuggy: false,
};

export default MovieCard;
