import React from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './SortElement.module.scss';
import { SORT_BY_VALUES } from '~/services/mock-data';
import { useQuery } from '../../utils/hooks';
import { isNullableOrEmpty } from '../../utils/check-value';

const SortElement = ({
  sortBy: currentSortBy,
  sortOrder: currentSortOrder,
}) => {
  const history = useHistory();
  const query = useQuery();

  const updateQuery = (newSortBy, newSortOrder) => {
    query.set('sortBy', newSortBy);
    query.set('sortOrder', newSortOrder);
    history.push(`/?${query.toString()}`);
  };

  const handleChange = (event) => {
    const [newSortBy, newSortOrder] = event.target.value.split(',');
    updateQuery(newSortBy, newSortOrder);
  };

  const selectedValue = !isNullableOrEmpty(currentSortBy) && !isNullableOrEmpty(currentSortOrder)
    ? `${currentSortBy},${currentSortOrder}`
    : undefined;

  return (
    <div className={styles.SortElement}>
      <p>Sort By</p>
      <p>
        <select
          className={styles.dropdown}
          value={selectedValue}
          onChange={handleChange}
          defaultValue
        >
          <option disabled value> -- select an option </option>
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

export default connect(mapStateToProps)(SortElement);
