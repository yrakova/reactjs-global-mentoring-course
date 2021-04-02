import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './FormField.module.scss';

const FormFieldSelect = ({
  label, options, onChange, value,
}) => (
  <div className={styles.FormField}>
    <label>{label}</label>
    <Select
      className={styles.selectWrapper}
      options={options}
      isMulti
      onChange={onChange}
      value={value}
    />
  </div>
);

FormFieldSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

FormFieldSelect.defaultProps = {
  onChange: () => {},
  options: [],
};

export default FormFieldSelect;
