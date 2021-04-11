import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import Header from '../../components/Header';
import MovieTable from '../../components/MovieTable';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import styles from '../../assets/styles/main.scss';
import {
  actionUiSetSorting,
  actionUiSetFilters,
} from '../../store/actions/search-actions';
import {
  getMovies,
  actionResetMovies,
} from '../../store/actions/movies-actions';
import { isNullableOrEmpty } from '../../utils/check-value';
import { useQuery } from '../../utils/hooks';

const Home = ({
  setFilters,
  setSorting,
  fetchMovies,
  resetMovies,
  sortBy,
  sortOrder,
  filters,
}) => {
  const query = useQuery();

  const filtersFromParams = query.get('filters');
  const sortByFromParams = query.get('sortBy');
  const sortOrderFromParams = query.get('sortOrder');

  useEffect(() => {
    setFilters(filtersFromParams ? filtersFromParams.split(',') : []);
    setSorting(sortByFromParams, sortOrderFromParams);
  }, [filtersFromParams, sortByFromParams, sortOrderFromParams]);

  useEffect(() => {
    if (!isNullableOrEmpty(filters)) {
      fetchMovies();
    } else {
      resetMovies();
    }
  }, [sortBy, sortOrder, filters]);

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
  sortBy: state.searchReducer.sortBy,
  sortOrder: state.searchReducer.sortOrder,
  filters: state.searchReducer.filters,
});

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(actionUiSetFilters(filters)),
  setSorting: (sortBy, sortOrder) => dispatch(actionUiSetSorting(sortBy, sortOrder)),
  fetchMovies: () => dispatch(getMovies()),
  resetMovies: () => dispatch(actionResetMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
