import { SET_SORTING } from '../actions/search-action-types';
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
    default:
      return state;
  }
};
