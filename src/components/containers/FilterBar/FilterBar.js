import React from 'react';
import FilterItem from '~/components/FilterItem';

const GENRES = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Documentary' },
  { id: 3, label: 'Comedy' },
  { id: 4, label: 'Horror' },
  { id: 5, label: 'Crime' },
];

const FilterBar = () =>
  GENRES.map((genre) => <FilterItem key={genre.id} title={genre.label} />);

FilterBar.propTypes = {};

FilterBar.defaultProps = {};

export default FilterBar;
