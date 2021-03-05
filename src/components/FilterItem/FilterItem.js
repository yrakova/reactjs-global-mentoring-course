import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterItem.module.scss';

const FilterItem = ({ title }) => (
  <button className={styles.filterButton}>{title}</button>
);

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
};

FilterItem.defaultProps = {};

export default FilterItem;
