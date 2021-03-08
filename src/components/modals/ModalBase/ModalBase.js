import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ModalBase.module.scss';

const modalRoot = document.getElementById('modal-root');

export default class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    const { children, onClose, title } = this.props;

    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <div className={styles.ModalBase}>
        <div className={styles.container}>
          <button className={styles.btnClose} onClick={() => onClose()}>✕</button>
          <p className={styles.title}>{title}</p>
          {children}
        </div>
      </div>,
      // A DOM element
      this.el,
    );
  }
}

ModalBase.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
};

ModalBase.defaultProps = {
  onClose: () => {},
  title: 'Dialog Title',
};
