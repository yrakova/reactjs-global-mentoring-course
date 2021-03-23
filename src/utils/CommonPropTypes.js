import PropTypes from 'prop-types';

export const MoviePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  vote_average: PropTypes.number,
});
