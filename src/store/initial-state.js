export const MOVIES_INITIAL_STATE = {
  movies: [],
  updatingMovie: null,
  isFetching: false,
  isSubmitting: false,
  selectedMovie: null,
};

export const SETTINGS_INITIAL_STATE = {
  limit: 21,
  offset: 0,
  sortBy: 'release_date',
  sortOrder: 'desc',
  filters: [],
  searchValue: '',
  searchBy: 'title',
};
