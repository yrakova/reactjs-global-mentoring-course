import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FilterItem from '~/components/FilterItem';
import { GENRES } from '~/services/mock-data';
import { useQuery } from '../../../utils/hooks';

const FilterBar = ({
  selectedGenres,
}) => {
  const history = useHistory();
  const query = useQuery();

  const addFilter = (title) => {
    let filters = query.get('filters');
    filters = filters ? filters.split(',') : [];
    filters.push(title);
    query.set('filters', filters.join(','));
    history.push(`/?${query.toString()}`);
  };

  const removeFilter = (title) => {
    let filters = (query.get('filters') || '').split(',');
    filters = filters.filter((filter) => filter !== title); // remove item
    query.set('filters', filters.join(','));
    history.push(`/?${query}`);
  };

  const onFilterItemToggle = (title, selected) => {
    if (selected) {
      addFilter(title);
    } else {
      removeFilter(title);
    }
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

export default connect(mapStateToProps)(FilterBar);
