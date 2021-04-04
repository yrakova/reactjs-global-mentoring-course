import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import styles from './FormField.module.scss';
import mainStyles from '~/assets/styles/main';
import FormFieldErrorBoundary from '../error-boundaries/FormFieldErrorBoundary';

const FormField = ({
  label,
  isEditable,
  name,
  type,
  placeholder,
}) => {
  const [field, meta] = useField(name);

  const inputProps = {
    readOnly: !isEditable,
    label,
    name,
    type,
    placeholder,
  };

  const isInvalid = meta.error && meta.touched;
  const fieldClassName = isInvalid ? mainStyles.fieldInvalid : '';

  return (
    <FormFieldErrorBoundary>
      <div className={styles.FormField}>
        <label htmlFor={name}>{label}</label>

        {type === 'textarea' ? (
          <textarea {...inputProps} {...field} className={fieldClassName} />
        ) : (
          <input type={type} {...inputProps} {...field} className={fieldClassName} />
        )}
        <div className={mainStyles.errorContainer}>
          {isInvalid && <span className={mainStyles.error}>{meta.error}</span>}
        </div>
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
