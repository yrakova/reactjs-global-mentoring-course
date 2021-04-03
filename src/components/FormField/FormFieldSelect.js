import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from 'formik';
import styles from './FormField.module.scss';
import FormFieldErrorBoundary from '../error-boundaries/FormFieldErrorBoundary';

const mapValues = (values) => (values ? values.map((val) => ({ label: val, value: val })) : []);

const FormFieldSelect = ({ label, options, name }) => {
  const [, meta, helpers] = useField(name);
  const { value: selectedValues } = meta;
  const { setValue } = helpers;

  const onSelectChange = (newValues) => {
    setValue(newValues.map(({ value }) => value));
  };

  return (
    <FormFieldErrorBoundary>
      <div className={styles.FormField}>
        <label htmlFor={name}>{label}</label>
        <Select
          className={styles.selectWrapper}
          options={options}
          isMulti
          onChange={onSelectChange}
          value={mapValues(selectedValues)}
        />
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
