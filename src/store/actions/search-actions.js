import {
  SET_SORTING, SET_FILTERS, ADD_FILTER, REMOVE_FILTER,
} from './search-action-types';

export const UI_SET_SORTING = (sortBy, sortOrder) => ({
  type: SET_SORTING,
  payload: { sortBy, sortOrder },
});

export const UI_SET_FILTERS = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const UI_ADD_FILTER = (filter) => ({
  type: ADD_FILTER,
  payload: filter,
});

export const UI_REMOVE_FILTER = (filter) => ({
  type: REMOVE_FILTER,
  payload: filter,
});
