import React from 'react';
import styles from './Header.module.scss';
import SearchElement from '~/components/SearchElement';
import Logo from '../Logo';
import AddMovieButton from '../AddMovieButton/AddMovieButton';

const Header = () => (
  <div className={styles.Header}>
    <div className={styles.topContainer}>
      <Logo />
      <AddMovieButton />
    </div>
    <div className={styles.searchContainer}>
      <SearchElement />
    </div>
  </div>
);

export default Header;
