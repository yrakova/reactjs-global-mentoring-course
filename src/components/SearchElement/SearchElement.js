import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isNullableOrEmpty } from '../../utils/check-value';

import styles from './SearchElement.module.scss';

const SearchElement = ({ searchValue }) => {
  const history = useHistory();

  const [currentSearchValue, setCurrentSearchValue] = useState(searchValue);

  useEffect(() => {
    setCurrentSearchValue(searchValue);
  }, [searchValue]);

  const startSearch = () => {
    if (!isNullableOrEmpty(currentSearchValue)) {
      history.push(`/search/${currentSearchValue}`);
    }
  };

  const onInputChange = (evt) => {
    setCurrentSearchValue(evt.target.value);
  };

  const onKeyUp = (evt) => {
    if (evt.code === 'Enter') {
      startSearch();
    }
  };

  return (
    <>
      <h1 className={styles.title}>FIND YOUR MOVIE</h1>
      <div className={styles.searchDiv}>
        <input
          placeholder="What do you want to watch?"
          value={currentSearchValue}
          onChange={onInputChange}
          onKeyUp={onKeyUp}
        />
        <button className={styles.searchButton} onClick={startSearch}>
          SEARCH
        </button>
      </div>
    </>
  );
};

SearchElement.propTypes = {};

SearchElement.defaultProps = {};

const mapStateToProps = (state) => ({
  searchValue: state.searchReducer.searchValue,
});

export default connect(mapStateToProps)(SearchElement);
