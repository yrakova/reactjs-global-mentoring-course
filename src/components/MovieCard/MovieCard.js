import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieCard.module.scss";

const MovieCard = (props) => {
  if (props.isBuggy) {
    throw new Error("random error");
  }

  return (
    <div className={styles.MovieCard}>
      <img src={props.posterUri} />
      <div className={styles.descriptionContainer}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.year}>{props.year}</p>
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

MovieCard.defaultProps = {};

export default MovieCard;
