import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';

const Page404 = () => (
  <div className={styles.Page404}>
    <h1>404</h1>
    <h2>Page not found</h2>
    <Link to="/">
      <button type="button">Go back to Home</button>
    </Link>
  </div>
);

Page404.propTypes = {};

Page404.defaultProps = {};

export default Page404;
