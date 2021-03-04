import React from "react";
import styles from "./MovieTable.module.scss";
import MovieList from "./../containers/MovieList";

const MovieTable = () => (
  <div className={styles.MovieTable}>
    <MovieList />
  </div>
);

MovieTable.propTypes = {};

MovieTable.defaultProps = {};

export default MovieTable;
