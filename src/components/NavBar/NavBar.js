import React from "react";
import styles from "./NavBar.module.scss";
import FilterBar from "../containers/FilterBar/FilterBar";
import SortElement from "../SortElement/SortElement";

const NavBar = () => (
  <div className={styles.NavBar}>
    <FilterBar />
    <SortElement />
  </div>
);

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
