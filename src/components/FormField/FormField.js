import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.module.scss';

const FormField = ({ label, type, isEditable }) => (
  <div className={styles.FormField}>

    <label>{label}</label>

    {type === 'textarea' ? (
      <textarea readOnly={!isEditable} />
    ) : (
      <input type={type} readOnly={!isEditable} />
    )}

  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool,
};

FormField.defaultProps = {
  type: 'text',
  onChange: () => {},
  isEditable: true,
};

export default FormField;
