import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieOptionsPopup.module.scss';
import mainStyles from '~/assets/styles/main.scss';

const MovieOptionsPopup = ({ show, onAction }) => {
  const hiddenClassName = show ? '' : `${mainStyles.hidden}`;

  const onEditAction = (e) => {
    e.stopPropagation();
    onAction('edit');
  };

  const onDeleteAction = (e) => {
    e.stopPropagation();
    onAction('delete');
  };

  return (
    <div className={`${styles.MovieOptionsPopup} ${hiddenClassName}`} onMouseLeave={() => onAction('close')}>
      <div className={styles.optionsContainer}>
        <button onClick={onEditAction}>Edit</button>
        <button onClick={onDeleteAction}>Delete</button>
      </div>
    </div>
  );
};

MovieOptionsPopup.propTypes = {
  show: PropTypes.bool,
  onAction: PropTypes.func,
};

MovieOptionsPopup.defaultProps = {
  show: false,
  onAction: () => {},
};

export default MovieOptionsPopup;
