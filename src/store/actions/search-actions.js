import {
  SET_SORTING, SET_FILTERS, ADD_FILTER, REMOVE_FILTER,
} from './search-action-types';

export const actionUiSetSorting = (sortBy, sortOrder) => ({
  type: SET_SORTING,
  payload: { sortBy, sortOrder },
});

export const actionUiSetFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters || [],
});

export const actionUiAddFilter = (filter) => ({
  type: ADD_FILTER,
  payload: filter,
});

export const actionUiRemoveFilter = (filter) => ({
  type: REMOVE_FILTER,
  payload: filter,
});
