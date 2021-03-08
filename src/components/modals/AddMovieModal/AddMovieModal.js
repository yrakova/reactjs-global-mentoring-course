import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';

class AddMovieModal extends React.Component {
  render() {
    const { show, movieId, onAction } = this.props;

    return show ? (
      <ModalBase>
        <div className={styles.AddMovieModal}>
          <button onClick={() => onAction('cancel', movieId)}>✕</button>
        </div>
      </ModalBase>
    ) : null;
  }
}

AddMovieModal.propTypes = {
  onAction: PropTypes.func,
};

AddMovieModal.defaultProps = {
  onAction: () => {},
};

export default AddMovieModal;
