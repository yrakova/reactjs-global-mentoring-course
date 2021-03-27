import PropTypes from 'prop-types';

export const MoviePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  poster_path: PropTypes.string.isRequired,
  runtime: PropTypes.number,
  vote_average: PropTypes.number,
});
