import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
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

const getOptions = (options) => (options ? options.map((option) => ({ label: option, value: option })) : []);

const GENRES_OPTIONS = getOptions(GENRES.slice(0).sort(sortAbc));

const MOVIE_TEMPLATE = {
  title: '',
  overview: '',
  release_date: '',
  poster_path: '',
  runtime: '',
  genres: [],
};

const AddMovieModal = ({
  isEdit, movie, onAction, show, isSubmitting,
}) => {
  const actionName = isEdit ? 'update' : 'create';

  return show ? (
    <ModalBase
      title={isEdit ? 'Edit Movie' : 'Add Movie'}
      onClose={() => onAction('close')}
    >
      <Formik
        initialValues={{ ...MOVIE_TEMPLATE, ...movie }}
        onSubmit={(values) => {
          onAction(actionName, { ...values });
        }}
      >
        {(resetForm) => (
          <Form>
            <div className={styles.AddMovieModal}>
              {FIELDS.filter(
                (field) => !field.readOnly || isEdit,
              ).map((field) => (field.type === 'select' ? (
                <FormFieldSelect
                  key={field.label}
                  label={field.label}
                  name={field.key}
                  options={GENRES_OPTIONS}
                />
              ) : (
                <FormField
                  key={field.label}
                  label={field.label}
                  name={field.key}
                  type={field.type}
                  isEditable={!field.readOnly}
                />
              )))}

              <div className={styles.buttonsContainer}>
                <button type="reset" disabled={isSubmitting}>
                  RESET
                </button>
                <button type="submit" disabled={isSubmitting}>
                  {isEdit ? 'SAVE' : 'SUBMIT'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
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

const mapStateToProps = (state) => ({
  isSubmitting: state.moviesReducer.isSubmitting,
});

export default connect(mapStateToProps)(AddMovieModal);
