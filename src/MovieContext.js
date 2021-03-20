import React from 'react';

const MovieContext = React.createContext({
  selectedMovie: null,
  setSelectedMovie: () => {},
});

export default MovieContext;
