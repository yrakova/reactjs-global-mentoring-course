import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from 'formik';
import styles from './FormField.module.scss';
import mainStyles from '~/assets/styles/main';
import FormFieldErrorBoundary from '../error-boundaries/FormFieldErrorBoundary';
import variables from '~/assets/styles/variables';

const mapValues = (values) => (values ? values.map((val) => ({ label: val, value: val })) : []);

const FormFieldSelect = ({ label, options, name }) => {
  const [, meta, helpers] = useField(name);
  const { value: selectedValues } = meta;
  const { setValue, setTouched } = helpers;

  const onSelectChange = (newValues) => {
    setValue(newValues.map(({ value }) => value));
  };

  const isInvalid = meta.touched && meta.error;

  const customStyles = {
    control: (base) => (isInvalid
      ? {
        ...base,
        borderColor: variables.errorBorderColor,
        '&:hover': {
          borderColor: variables.errorBorderColor,
        },
        backgroundColor: variables.errorBackgroundColor,
      }
      : { ...base }),
  };

  return (
    <FormFieldErrorBoundary>
      <div className={styles.FormField}>
        <label htmlFor={name}>{label}</label>
        <Select
          styles={customStyles}
          className={styles.selectWrapper}
          options={options}
          isMulti
          onChange={onSelectChange}
          value={mapValues(selectedValues)}
          onBlur={setTouched}
        />
        <div className={mainStyles.errorContainer}>
          {isInvalid && <span className={mainStyles.error}>{meta.error}</span>}
        </div>
      </div>
    </FormFieldErrorBoundary>
  );
};

FormFieldSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  name: PropTypes.string.isRequired,
};

FormFieldSelect.defaultProps = {
  options: [],
};

export default FormFieldSelect;
