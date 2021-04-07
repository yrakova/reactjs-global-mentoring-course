export const isNullable = (value) => value === null || value === undefined;

export const isEmptyArray = (value) => Array.isArray(value) && !value.length;

export const isNullableOrEmpty = (value) => isNullable(value)
  || value === ''
  || isEmptyArray(value);
