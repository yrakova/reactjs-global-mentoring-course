import React from 'react';
import styles from './AddMovieButton.module.scss';
import AddMovieModal from '~/components/modals/AddMovieModal';

class AddMovieButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAddMovieForm: false };

    this.onAddMovieAction = this.onAddMovieAction.bind(this);
    this.openAddMovieForm = this.openAddMovieForm.bind(this);
  }

  onAddMovieAction() {
    this.setState({ showAddMovieForm: false });
  }

  openAddMovieForm() {
    this.setState({ showAddMovieForm: true });
  }

  render() {
    const { showAddMovieForm } = this.state;
    return (
      <>
        <button className={styles.btnAddMovie} onClick={this.openAddMovieForm}>+Add Movie</button>
        <AddMovieModal show={showAddMovieForm} onAction={this.onAddMovieAction} />
      </>
    );
  }
}

AddMovieButton.propTypes = {};

AddMovieButton.defaultProps = {};

export default AddMovieButton;
