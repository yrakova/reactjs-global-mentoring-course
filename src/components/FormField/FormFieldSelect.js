import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './FormField.module.scss';

const FormFieldSelect = ({ label, isEditable, options }) => (
  <div className={styles.FormField}>
    <label>{label}</label>
    <Select className={styles.selectWrapper} options={options} isMulti />
  </div>
);

FormFieldSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool,
  options: PropTypes.array,
};

FormFieldSelect.defaultProps = {
  type: 'text',
  onChange: () => {},
  isEditable: true,
  options: [],
};

export default FormFieldSelect;
