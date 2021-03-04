import React from "react";
import PropTypes from "prop-types";
import styles from "./FilterItem.module.scss";

const FilterItem = (props) => (
  <button className={styles.filterButton}>{props.title}</button>
);

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
};

FilterItem.defaultProps = {};

export default FilterItem;
