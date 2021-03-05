import React from 'react';

import styles from './MovieCardErrorBoundary.module.scss';
import movieCardStyles from '~/components/MovieCard/MovieCard.module.scss';

class MovieCardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className={movieCardStyles.MovieCard}>
          <span className={styles.errorText}>
            <h3>Something went wrong.</h3>
            <p>{error.toString()}</p>
          </span>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

MovieCardErrorBoundary.propTypes = {};

MovieCardErrorBoundary.defaultProps = {};

export default MovieCardErrorBoundary;
