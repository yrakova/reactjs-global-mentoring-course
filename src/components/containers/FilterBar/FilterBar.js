import React from 'react';
import FilterItem from '~/components/FilterItem';
import { GENRES } from '~/services/mock-data';

const FilterBar = () => GENRES.filter((_, index) => index < 5).map((genre) => (
  <FilterItem key={genre} title={genre} />
));

FilterBar.propTypes = {};

FilterBar.defaultProps = {};

export default FilterBar;
