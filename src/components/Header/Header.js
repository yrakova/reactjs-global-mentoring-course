import React from 'react';
import styles from './Header.module.scss';
import SearchElement from '~/components/SearchElement';
import Logo from '../Logo';
import AddMovieButton from '../AddMovieButton/AddMovieButton';

const Header = () => (
  <>
    <div className={styles.Header}>
      <Logo />
      <AddMovieButton />
    </div>
    <SearchElement />
  </>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
