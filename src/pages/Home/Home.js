import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import MovieTable from '../../components/MovieTable';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import styles from '../../assets/styles/main.scss';
import { actionUiSetSearch } from '../../store/actions/search-actions';
import {
  getMovies,
  actionResetMovies,
} from '../../store/actions/movies-actions';
import { isNullableOrEmpty } from '../../utils/check-value';

const Home = ({
  setSearch,
  fetchMovies,
  resetMovies,
  searchValue,
  searchBy,
  sortBy,
  sortOrder,
  filters,
}) => {
  const match = useRouteMatch({ path: '/search/:searchValue', strict: true });

  useEffect(() => {
    if (match) {
      const { searchValue: searchValueFromUrl } = match.params;
      if (searchValueFromUrl !== searchValue) {
        setSearch(searchValueFromUrl);
      }
    }
  }, [match]);

  useEffect(() => {
    if (!isNullableOrEmpty(searchValue)) {
      fetchMovies();
    } else {
      resetMovies();
    }
  }, [searchValue, filters, sortBy, sortOrder, searchBy]);

  return (
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
};

Home.propTypes = {};

Home.defaultProps = {};

const mapStateToProps = (state) => ({
  searchValue: state.searchReducer.searchValue,
  sortBy: state.searchReducer.sortBy,
  sortOrder: state.searchReducer.sortOrder,
  filters: state.searchReducer.filters,
  searchBy: state.searchReducer.searchBy,
});

const mapDispatchToProps = (dispatch) => ({
  setSearch: (searchValue) => dispatch(actionUiSetSearch(searchValue)),
  fetchMovies: () => dispatch(getMovies()),
  resetMovies: () => dispatch(actionResetMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
