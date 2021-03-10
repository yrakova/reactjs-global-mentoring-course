import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.scss';
import MovieOptionsPopup from '../MovieOptionsPopup/MovieOptionsPopup';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptionsPopup: false,
    };
  }

  onOptionsPopupAction = (action) => {
    const { optionsHandler, movie: { id } } = this.props;
    optionsHandler(action, id);
    this.hideOptionsPopup();
  }

  hideOptionsPopup = () => {
    this.setState({ showOptionsPopup: false });
  }

  toggleOptionsPopup = () => {
    this.setState((prevState) => ({ showOptionsPopup: !prevState.showOptionsPopup }));
  }

  render() {
    const { movie: { title, year, posterUri } } = this.props;
    const { showOptionsPopup } = this.state;
    return (
      <>
        <div className={styles.MovieCard}>
          <div className={styles.imgContainer}>
            <img src={posterUri} />
            <button
              className={styles.btnOptions}
              onClick={this.toggleOptionsPopup}
            >
              ...
            </button>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.title}>{title}</p>
            <p className={styles.year}>{year}</p>
          </div>
          <div className={styles.optionsContainer}>
            <MovieOptionsPopup
              show={showOptionsPopup}
              onAction={this.onOptionsPopupAction}
            />
          </div>
        </div>
      </>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    posterUri: PropTypes.string.isRequired,
  }).isRequired,
  optionsHandler: PropTypes.func,
};

MovieCard.defaultProps = {
  optionsHandler: () => {},
};

export default MovieCard;
