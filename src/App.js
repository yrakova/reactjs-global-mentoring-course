import React, { StrictMode } from 'react';
import Header from './components/Header';
import MovieTable from './components/MovieTable';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import styles from './assets/styles/main.scss';

export const App = () => (
  <StrictMode>
    <div className={styles.app}>
      <Header />
      <NavBar />
      <MovieTable />
      <Footer />
    </div>
  </StrictMode>
);
