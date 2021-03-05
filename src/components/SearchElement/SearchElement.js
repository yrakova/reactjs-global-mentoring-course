import React from 'react';

import styles from './SearchElement.module.scss';

const SearchElement = () => (
  <>
    <h1 className={styles.title}>FIND YOUR MOVIE</h1>
    <div className={styles.searchDiv}>
      <input placeholder="What do you want to watch?" />
      <button className={styles.searchButton}>SEARCH</button>
    </div>
  </>
);

SearchElement.propTypes = {};

SearchElement.defaultProps = {};

export default SearchElement;
