import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';
import { GENRES } from '~/services/mock-data';
import FormField from '../../FormField/FormField';
import FormFieldSelect from '../../FormField/FormFieldSelect';
import { MoviePropTypes } from '~/utils/CommonPropTypes';

const FIELDS = [
  {
    label: 'Movie Id', type: 'text', readOnly: true, key: 'id',
  },
  { label: 'Title', type: 'text', key: 'title' },
  { label: 'Release Date', type: 'date' },
  { label: 'Movie Url', type: 'text' },
  {
    label: 'Genre', type: 'select', values: GENRES, key: 'genres',
  },
  { label: 'Overview', type: 'textarea' },
  { label: 'Runtime', type: 'textarea' },
];

const GENRES_OPTIONS = GENRES.map((genre) => ({
  value: genre.label,
  label: genre.label,
}));

const AddMovieModal = ({
  show, onAction, isEdit, movie,
}) => {
  const onReset = () => {
    // TODO clear form
  };

  const onSaveOrSubmit = () => {
    // TODO
  };

  return show ? (
    <ModalBase title={isEdit ? 'Edit Movie' : 'Add Movie'} onClose={() => onAction('close')}>
      <div className={styles.AddMovieModal}>
        {FIELDS
          .filter((field) => !field.readOnly || isEdit)
          .map((field) => (field.type === 'select' ? (
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
              isEditable={!field.readOnly}
              value={isEdit ? movie[field.key] : ''}
            />
          )))}
        <div className={styles.buttonsContainer}>
          <button onClick={onReset}>RESET</button>
          <button onClick={onSaveOrSubmit}>{isEdit ? 'SAVE' : 'SUBMIT'}</button>
        </div>
      </div>
    </ModalBase>
  ) : null;
};

AddMovieModal.propTypes = {
  onAction: PropTypes.func,
  isEdit: PropTypes.bool,
  movie: MoviePropTypes,
};

AddMovieModal.defaultProps = {
  onAction: () => {},
  isEdit: false,
  movie: null,
};

export default AddMovieModal;
