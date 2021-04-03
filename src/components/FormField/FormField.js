import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import styles from './FormField.module.scss';
import FormFieldErrorBoundary from '../error-boundaries/FormFieldErrorBoundary';

const FormField = ({
  label,
  isEditable,
  name,
  type,
}) => {
  const [field] = useField(name);

  const inputProps = {
    readOnly: !isEditable,
    label,
    name,
    type,
  };

  return (
    <FormFieldErrorBoundary>
      <div className={styles.FormField}>
        <label htmlFor={name}>{label}</label>

        {type === 'textarea' ? (
          <textarea {...inputProps} {...field} />
        ) : (
          <input type={type} {...inputProps} {...field} />
        )}
      </div>
    </FormFieldErrorBoundary>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  isEditable: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

FormField.defaultProps = {
  type: 'text',
  isEditable: true,
  placeholder: '',
};

export default FormField;
