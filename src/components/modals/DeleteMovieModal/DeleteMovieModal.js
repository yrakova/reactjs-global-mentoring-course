import React from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';

const DeleteMovieModal = (props) => {
  const { show, movieId, onAction } = props;

  return show ? (
    <ModalBase title="Delete Movie" onClose={() => onAction('close')}>
      <div className={styles.DeleteMovieModal}>
        <p>Are you sure you want to delete this movie?</p>
        <button onClick={() => onAction('confirm', movieId)}>Confirm</button>
      </div>
    </ModalBase>
  ) : null;
};

DeleteMovieModal.propTypes = {
  show: PropTypes.bool,
  onAction: PropTypes.func,
  movieId: PropTypes.number,
};

DeleteMovieModal.defaultProps = {
  show: false,
  onAction: () => {},
  movieId: null,
};

export default DeleteMovieModal;
