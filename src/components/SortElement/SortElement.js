import React from 'react';

import styles from './SortElement.module.scss';
import { SORT_BY_VALUES } from '~/services/mock-data';

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
