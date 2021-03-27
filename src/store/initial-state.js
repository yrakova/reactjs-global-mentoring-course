export const MOVIES_INITIAL_STATE = {
  movies: [],
  isLoading: false,
  updatingMovie: null,
};

export const SETTINGS_INITIAL_STATE = {
  limit: 21,
  offset: 0,
  sortBy: 'release_date',
  sortOrder: 'desc',
};
