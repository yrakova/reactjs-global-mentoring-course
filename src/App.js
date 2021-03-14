import React, { StrictMode, useState } from 'react';
import Header from './components/Header';
import MovieTable from './components/MovieTable';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import styles from './assets/styles/main.scss';
import MovieContext from './MovieContext';

export const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const resetSelectedMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <StrictMode>
      <div className={styles.mainContainer}>
        <div className={`${styles.headerContainer} ${styles.container}`}>
          <Header selectedMovie={selectedMovie} onCloseMovieDetails={resetSelectedMovie} />
        </div>
        <div className={styles.container}>
          <NavBar />
          <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
            <MovieTable />
          </MovieContext.Provider>
          <Footer />
        </div>
      </div>
    </StrictMode>
  );
};
