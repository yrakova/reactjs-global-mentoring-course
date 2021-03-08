import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.module.scss';

const FormField = ({
  label,
  type,
  isEditable,
  onChange,
  value,
  placeholder,
}) => (
  <div className={styles.FormField}>
    <label>{label}</label>

    {type === 'textarea' ? (
      <textarea
        readOnly={!isEditable}
        onChange={isEditable ? onChange : null}
        placeholder={placeholder}
        value={value}
      />
    ) : (
      <input
        type={type}
        readOnly={!isEditable}
        onChange={isEditable ? onChange : null}
        placeholder={placeholder}
        value={value}
      />
    )}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

FormField.defaultProps = {
  type: 'text',
  onChange: () => {},
  isEditable: true,
  value: '',
  placeholder: '',
};

export default FormField;
