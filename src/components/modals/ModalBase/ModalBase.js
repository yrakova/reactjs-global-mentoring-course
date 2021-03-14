import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ModalBase.module.scss';

const modalRoot = document.getElementById('modal-root');

const el = document.createElement('div');

const ModalBase = ({ children, onClose, title }) => {
  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  // Use a portal to render the children into the element
  return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    <div className={styles.ModalBase}>
      <div className={styles.container}>
        <button className={styles.btnClose} onClick={onClose}>
          ✕
        </button>
        <p className={styles.title}>{title}</p>
        {children}
      </div>
    </div>,
    // A DOM element
    el,
  );
};

ModalBase.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
};

ModalBase.defaultProps = {
  onClose: () => {},
  title: 'Dialog Title',
};

export default ModalBase;
