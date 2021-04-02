import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterItem.module.scss';

const FilterItem = ({ title, selected, onToggle }) => {
  const toggleSelected = () => {
    onToggle(title, !selected);
  };

  const additionalStyle = selected ? styles.selectedItem : '';
  return (
    <button
      className={`${styles.filterButton} ${additionalStyle}`}
      onClick={toggleSelected}
    >
      {title}
    </button>
  );
};

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
};

FilterItem.defaultProps = {
  selected: false,
  onToggle: () => {},
};

export default FilterItem;
