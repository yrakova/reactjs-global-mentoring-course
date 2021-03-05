import React from 'react';
import MovieCardErrorBoundary from '~/components/error-boundaries/MovieCardErrorBoundary';
import MovieCard from '~/components/MovieCard';
import { mockMoviesData } from '~/services/mock-data';

const MovieList = () => (
  <>
    {mockMoviesData.movies.map((movie) => (
      <MovieCardErrorBoundary key={movie.id}>
        <MovieCard
          title={movie.title}
          posterUri={movie.posterUri}
          year={movie.year}
          isBuggy={movie.id === 4}
        />
      </MovieCardErrorBoundary>
    ))}
  </>
);

MovieList.propTypes = {};

MovieList.defaultProps = {};

export default MovieList;
