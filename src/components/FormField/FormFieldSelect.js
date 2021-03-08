import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './FormField.module.scss';

const FormFieldSelect = ({
  label,
  options,
  onChange,
}) => (
  <div className={styles.FormField}>
    <label>{label}</label>
    <Select
      className={styles.selectWrapper}
      options={options}
      isMulti
      onChange={onChange}
    />
  </div>
);

FormFieldSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

FormFieldSelect.defaultProps = {
  onChange: () => {},
  options: [],
};

export default FormFieldSelect;
