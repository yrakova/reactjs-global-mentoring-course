import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './AddMovieButton.module.scss';
import AddMovieModal from '~/components/modals/AddMovieModal';
import { createMovie } from '../../store/actions-creator';

export const AddMovieButton = ({ requestCreateMovie }) => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);

  const onAddMovieAction = (formAction, mutableMovie) => {
    // setShowAddMovieForm(false);
    switch (formAction) {
      case 'close':
        setShowAddMovieForm(false);
        break;
      case 'create':
        requestCreateMovie(mutableMovie);
        break;
      default:
        throw new Error(`Unsupported action ${formAction} for Add Movie form`);
    }
  };

  const openAddMovieForm = () => {
    setShowAddMovieForm(true);
  };

  return (
    <>
      <button className={styles.btnAddMovie} onClick={openAddMovieForm}>
        +Add Movie
      </button>
      <AddMovieModal
        show={showAddMovieForm}
        onAction={onAddMovieAction}
      />
    </>
  );
};

AddMovieButton.propTypes = {};

AddMovieButton.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  requestCreateMovie: (movie) => dispatch(createMovie(movie)),
});

export default connect(null, mapDispatchToProps)(AddMovieButton);
