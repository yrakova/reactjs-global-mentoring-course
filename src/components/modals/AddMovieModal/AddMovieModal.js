import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './AddMovieModal.module.scss';
import ModalBase from '../ModalBase/ModalBase';
import { GENRES } from '~/services/mock-data';
import FormField from '../../FormField/FormField';
import FormFieldSelect from '../../FormField/FormFieldSelect';
import { MoviePropTypes } from '~/utils/CommonPropTypes';
import { sortAbc } from '~/utils/sorting';
import { isNullable } from '~/utils/check-value';

const FIELDS = [
  {
    label: 'Movie Id',
    type: 'text',
    readOnly: true,
    key: 'id',
  },
  {
    label: 'Title',
    type: 'text',
    key: 'title',
    placeholder: 'Input title',
    validationSchema: Yup.string().required().label('Title'),
  },
  {
    label: 'Release Date',
    type: 'date',
    key: 'release_date',
    placeholder: 'Select Date',
    validationSchema: Yup.date().label('Release Date'),
  },
  {
    label: 'Poster Url',
    type: 'text',
    key: 'poster_path',
    placeholder: 'Poster URL here',
    validationSchema: Yup.string().url().required().label('Poster Url'),
  },
  {
    label: 'Genre',
    type: 'select',
    values: GENRES,
    key: 'genres',
    placeholder: 'Select Genre(s)',
    validationSchema: Yup.array()
      .of(Yup.string().oneOf(GENRES))
      .min(1)
      .required()
      .label('Genres'),
  },
  {
    label: 'Runtime',
    type: 'number',
    key: 'runtime',
    placeholder: 'Runtime here',
    validationSchema: Yup.number()
      .required()
      .positive()
      .integer()
      .label('Runtime'),
  },
  {
    label: 'Overview',
    type: 'textarea',
    key: 'overview',
    placeholder: 'Overview here',
    validationSchema: Yup.string().required().label('Overview'),
  },
];

const getOptions = (options) => (options ? options.map((option) => ({ label: option, value: option })) : []);

const GENRES_OPTIONS = getOptions(GENRES.slice(0).sort(sortAbc));

const validationSchemas = Object.assign(
  {},
  ...FIELDS.filter((field) => field.validationSchema).map((field) => ({
    [field.key]: field.validationSchema,
  })),
);

const commonValidationSchema = Yup.object(validationSchemas);

const MOVIE_DEFAULTS = {
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

  const validMovieFields = movie
    ? Object.keys(movie).map((keyName) => ({
      [keyName]: isNullable(movie[keyName]) ? '' : movie[keyName],
    }))
    : [{}];
  const validMovie = Object.assign({}, ...validMovieFields);

  return show ? (
    <ModalBase
      title={isEdit ? 'Edit Movie' : 'Add Movie'}
      onClose={() => onAction('close')}
    >
      <Formik
        initialValues={{ ...MOVIE_DEFAULTS, ...validMovie }}
        onSubmit={(values) => {
          onAction(actionName, { ...values });
        }}
        validationSchema={commonValidationSchema}
      >
        {({ dirty }) => {
          const buttonsDisabled = isSubmitting || !dirty;
          return (
            <Form>
              <div className={styles.AddMovieModal}>
                {FIELDS.filter(
                  (field) => !field.readOnly || isEdit,
                ).map((field) => (field.type === 'select' ? (
                  <FormFieldSelect
                    key={field.label}
                    label={field.label}
                    name={field.key}
                    placeholder={field.placeholder}
                    options={GENRES_OPTIONS}
                  />
                ) : (
                  <FormField
                    key={field.label}
                    label={field.label}
                    name={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    isEditable={!field.readOnly}
                  />
                )))}

                <div className={styles.buttonsContainer}>
                  <button type="reset" disabled={buttonsDisabled}>
                    RESET
                  </button>
                  <button type="submit" disabled={buttonsDisabled}>
                    {isEdit ? 'SAVE' : 'SUBMIT'}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
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
