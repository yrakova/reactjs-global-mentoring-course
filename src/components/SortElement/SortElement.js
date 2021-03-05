import React from 'react';

import styles from './SortElement.module.scss';

const SORT_BY_VALUES = [
  { id: 1, label: 'Release Date', value: 'year' },
  { id: 2, label: 'Title', value: 'title' },
];

const SortElement = () => (
  <div className={styles.SortElement}>
    <p>Sort By</p>
    <p>
      <select className={styles.dropdown}>
        {SORT_BY_VALUES.map((opt) => (
          <option key={opt.id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </p>
  </div>
);

SortElement.propTypes = {};

SortElement.defaultProps = {};

export default SortElement;
