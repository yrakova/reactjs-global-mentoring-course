import React, { useState } from 'react';
import styles from './AddMovieButton.module.scss';
import AddMovieModal from '~/components/modals/AddMovieModal';

export const AddMovieButton = () => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);

  const onAddMovieAction = () => {
    setShowAddMovieForm(false);
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

export default AddMovieButton;
