import React from "react";

import styles from "./MovieCardErrorBoundary.module.scss";
import movieCardStyles from "~/components/MovieCard/MovieCard.module.scss";

class MovieCardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
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
    return this.props.children;
  }
}

MovieCardErrorBoundary.propTypes = {};

MovieCardErrorBoundary.defaultProps = {};

export default MovieCardErrorBoundary;
