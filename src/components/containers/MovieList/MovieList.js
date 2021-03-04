import MovieCardErrorBoundary from "~/components/error-boundaries/MovieCardErrorBoundary";
import MovieCard from "~/components/MovieCard";
import { mockData } from "~/services/mock-data";
import React from "react";

const MovieList = () => (
  <>
    {mockData.movies.map((movie) => (
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
