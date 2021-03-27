import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';
import { GENRES } from '~/services/mock-data';
import FormField from '../../FormField/FormField';
import FormFieldSelect from '../../FormField/FormFieldSelect';
import { MoviePropTypes } from '~/utils/CommonPropTypes';
import { sortAbc } from '~/utils/sorting';

const FIELDS = [
  {
    label: 'Movie Id',
    type: 'text',
    readOnly: true,
    key: 'id',
  },
  { label: 'Title', type: 'text', key: 'title' },
  { label: 'Release Date', type: 'date', key: 'release_date' },
  { label: 'Poster Url', type: 'text', key: 'poster_path' },
  {
    label: 'Genre',
    type: 'select',
    values: GENRES,
    key: 'genres',
  },
  { label: 'Runtime', type: 'number', key: 'runtime' },
  { label: 'Overview', type: 'textarea', key: 'overview' },
];

const mapOptions = (options) => (options ? options.map((option) => ({ label: option, value: option })) : []);

const GENRES_OPTIONS = mapOptions(GENRES.slice(0).sort(sortAbc));

const AddMovieModal = ({
  isEdit, movie, onAction, show,
}) => {
  const [mutableMovie, setMutableMovie] = useState({ ...movie });

  useEffect(() => {
    setMutableMovie({ ...movie });
    return () => setMutableMovie({});
  }, [show]);

  const onReset = () => {
    setMutableMovie({ ...movie });
  };

  const onSaveOrSubmit = () => {
    const actionName = isEdit ? 'update' : 'create';
    onAction(actionName, mutableMovie);
  };

  const onInputChange = (fieldKey, type, newValue) => {
    if (type === 'number') {
      newValue = Number(newValue);
    }
    const newMutableMovie = { ...mutableMovie, [fieldKey]: newValue };
    setMutableMovie(newMutableMovie);
  };

  const onSelectInputChange = (fieldKey, newValues) => {
    if (newValues) {
      const newMutableMovie = { ...mutableMovie, [fieldKey]: newValues.map(({ value }) => value) };
      setMutableMovie(newMutableMovie);
    }
  };

  return show ? (
    <ModalBase
      title={isEdit ? 'Edit Movie' : 'Add Movie'}
      onClose={() => onAction('close')}
    >
      <div className={styles.AddMovieModal}>
        {FIELDS.filter((field) => !field.readOnly || isEdit).map((field) => (field.type === 'select' ? (
          <FormFieldSelect
            key={field.label}
            label={field.label}
            options={GENRES_OPTIONS}
            onChange={(newValues) => {
              onSelectInputChange(field.key, newValues);
            }}
            value={mapOptions(mutableMovie[field.key])}
          />
        ) : (
          <FormField
            key={field.label}
            label={field.label}
            type={field.type}
            isEditable={!field.readOnly}
            onChange={(e) => onInputChange(field.key, field.type, e.target.value)}
            value={mutableMovie[field.key]}
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
  show: PropTypes.bool,
};

AddMovieModal.defaultProps = {
  onAction: () => {},
  isEdit: false,
  movie: null,
  show: false,
};

export default AddMovieModal;
