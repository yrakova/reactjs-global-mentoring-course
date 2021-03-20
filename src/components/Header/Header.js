import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import SearchElement from '~/components/SearchElement';
import Logo from '../Logo';
import AddMovieButton from '../AddMovieButton/AddMovieButton';
import { MoviePropTypes } from '~/utils/CommonPropTypes';
import MovieDetails from '../MovieDetails/MovieDetails';

const Header = ({ selectedMovie, onCloseMovieDetails }) => (
  <div className={styles.Header}>
    {selectedMovie
      ? <MovieDetails movie={selectedMovie} onBack={onCloseMovieDetails} />
      : (
        <>
          <div className={styles.topContainer}>
            <Logo />
            <AddMovieButton />
          </div>
          <div className={styles.searchContainer}>
            <SearchElement />
          </div>
        </>
      )}
  </div>
);

Header.propTypes = {
  selectedMovie: MoviePropTypes,
  onCloseMovieDetails: PropTypes.func,
};

Header.defaultProps = {
  selectedMovie: null,
  onCloseMovieDetails: () => {},
};

export default Header;
