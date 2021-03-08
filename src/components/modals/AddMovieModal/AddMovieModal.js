import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';

class AddMovieModal extends React.Component {
  render() {
    const { show, onAction, isEdit } = this.props;

    return show ? (
      <ModalBase title="Add Movie" onClose={() => onAction('close')}>
        <div className={styles.AddMovieModal} />

        <div className={styles.buttonsContainer}>
          <button>RESET</button>
          <button>{isEdit ? 'SAVE' : 'SUBMIT'}</button>
        </div>
      </ModalBase>
    ) : null;
  }
}

AddMovieModal.propTypes = {
  onAction: PropTypes.func,
  isEdit: PropTypes.bool,
};

AddMovieModal.defaultProps = {
  onAction: () => {},
  isEdit: false,
};

export default AddMovieModal;
