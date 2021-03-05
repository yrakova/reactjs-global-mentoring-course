import React from 'react';
import FilterItem from '~/components/FilterItem';
import { GENRES } from '~/services/mock-data';

const FilterBar = () => GENRES.map((genre) => <FilterItem key={genre.id} title={genre.label} />);

FilterBar.propTypes = {};

FilterBar.defaultProps = {};

export default FilterBar;
