import React from "react";
import styles from "./Header.module.scss";
import SearchElement from "~/components/SearchElement";
import Logo from "./../Logo";

const Header = () => (
  <>
    <div className={styles.Header}>
      <Logo />
      <button>+ Add Movie</button>
    </div>
    <SearchElement />
  </>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
