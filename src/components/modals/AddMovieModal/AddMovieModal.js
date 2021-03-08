import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';
import { GENRES } from '~/services/mock-data';
import FormField from '../../FormField/FormField';
import FormFieldSelect from '../../FormField/FormFieldSelect';

const FIELDS = [
  { label: 'Title', type: 'text' },
  { label: 'Release Date', type: 'date' },
  { label: 'Movie Url', type: 'text' },
  { label: 'Genre', type: 'select', values: GENRES },
  { label: 'Overview', type: 'textarea' },
  { label: 'Runtime', type: 'textarea' },
];

const GENRES_OPTIONS = GENRES.map((genre) => ({ value: genre.label, label: genre.label }));

class AddMovieModal extends React.Component {
  onReset() {
    // TODO clear form
  }

  render() {
    const { show, onAction, isEdit } = this.props;

    return show ? (
      <ModalBase title="Add Movie" onClose={() => onAction('close')}>
        <div className={styles.AddMovieModal}>
          {FIELDS.map((field) => (field.type === 'select' ? (
            <FormFieldSelect
              key={field.label}
              label={field.label}
              options={GENRES_OPTIONS}
            />
          ) : (
            <FormField
              key={field.label}
              label={field.label}
              type={field.type}
            />
          )))}
          <div className={styles.buttonsContainer}>
            <button onClick={() => this.onReset()}>RESET</button>
            <button>{isEdit ? 'SAVE' : 'SUBMIT'}</button>
          </div>
        </div>
      </ModalBase>
    ) : null;
  }
}

AddMovieModal.propTypes = {
  onAction: PropTypes.func,
  isEdit: PropTypes.bool,
};

AddMovieModal.defaultProps = {
  onAction: () => {},
  isEdit: false,
};

export default AddMovieModal;
