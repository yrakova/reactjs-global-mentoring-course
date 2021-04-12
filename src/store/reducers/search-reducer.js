import {
  SET_SORTING, SET_FILTERS, ADD_FILTER, REMOVE_FILTER, SET_SEARCH,
} from '../actions/search-action-types';
import { SETTINGS_INITIAL_STATE } from '../initial-state';

export default (state = SETTINGS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SORTING:
      const { sortBy, sortOrder } = action.payload;
      return {
        ...state,
        sortBy,
        sortOrder,
      };
    case SET_FILTERS:
      const filters = action.payload;
      return {
        ...state,
        filters: [...filters],
      };
    case ADD_FILTER:
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: [...state.filters.filter((item) => item !== action.payload)],
      };
    case SET_SEARCH:
      const { searchValue, searchBy } = action.payload;
      return {
        ...state,
        searchValue,
        searchBy,
      };
    default:
      return state;
  }
};
