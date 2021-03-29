import React, { useState } from 'react';

import { connect } from 'react-redux';
import styles from './SortElement.module.scss';
import { SORT_BY_VALUES } from '~/services/mock-data';
import { getMovies } from '../../store/actions/movies-actions';
import { actionUiSetSorting } from '../../store/actions/search-actions';

const SortElement = ({
  sortBy: currentSortBy, sortOrder: currentSortOrder, fetchMovies, setSorting,
}) => {
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [sortOrder, setSortOrder] = useState(currentSortOrder);

  const handleChange = (event) => {
    const [newSortBy, newSortOrder] = event.target.value.split(',');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setSorting(newSortBy, newSortOrder);
    fetchMovies();
  };

  const selectedValue = `${sortBy},${sortOrder}`;

  return (
    <div className={styles.SortElement}>
      <p>Sort By</p>
      <p>
        <select
          className={styles.dropdown}
          value={selectedValue}
          onChange={handleChange}
        >
          {SORT_BY_VALUES.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
};

SortElement.propTypes = {};

SortElement.defaultProps = {};

const mapStateToProps = (state) => ({
  sortBy: state.searchReducer.sortBy,
  sortOrder: state.searchReducer.sortOrder,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(getMovies()),
  setSorting: (sortBy, sortOrder) => dispatch(actionUiSetSorting(sortBy, sortOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortElement);
