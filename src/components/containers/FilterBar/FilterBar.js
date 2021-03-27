import React from 'react';
import { connect } from 'react-redux';
import FilterItem from '~/components/FilterItem';
import { GENRES } from '~/services/mock-data';
import { getMovies } from '../../../store/actions/movies-actions';
import {
  UI_ADD_FILTER,
  UI_REMOVE_FILTER,
} from '../../../store/actions/search-actions';

const FilterBar = ({
  selectedGenres,
  addFilter,
  removeFilter,
  fetchMovies,
}) => {
  const onFilterItemToggle = (title, selected) => {
    if (selected) {
      addFilter(title);
    } else {
      removeFilter(title);
    }
    fetchMovies();
  };

  const isSelected = (genre) => selectedGenres.includes(genre);

  return GENRES.map((genre) => (
    <FilterItem
      key={genre}
      title={genre}
      selected={isSelected(genre)}
      onToggle={onFilterItemToggle}
    />
  ));
};

FilterBar.propTypes = {};

FilterBar.defaultProps = {};

const mapStateToProps = (state) => ({
  selectedGenres: state.searchReducer.filters,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: (filter) => dispatch(UI_ADD_FILTER(filter)),
  removeFilter: (filter) => dispatch(UI_REMOVE_FILTER(filter)),
  fetchMovies: () => dispatch(getMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
