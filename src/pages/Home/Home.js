import React from 'react';

import Header from '../../components/Header';
import MovieTable from '../../components/MovieTable';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import styles from '../../assets/styles/main.scss';

const Home = () => (
  <div className={styles.mainContainer}>
    <div className={`${styles.headerContainer} ${styles.container}`}>
      <Header />
    </div>
    <div className={styles.container}>
      <NavBar />
      <MovieTable />
      <Footer />
    </div>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
