import { SET_SORTING } from './search-action-types';

export const UI_SET_SORTING = (sortBy, sortOrder) => ({
  type: SET_SORTING,
  payload: { sortBy, sortOrder },
});
