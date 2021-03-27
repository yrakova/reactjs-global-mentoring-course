import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.module.scss';

const FormField = ({
  label,
  type,
  isEditable,
  onChange,
  value,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const inputProps = {
    readOnly: !isEditable,
    onChange: isEditable ? onChange : null,
    placeholder,
    value: inputValue,
  };
  return (
    <div className={styles.FormField}>
      <label>{label}</label>

      {type === 'textarea' ? (
        <textarea {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
