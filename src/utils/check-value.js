export const isNullable = (value) => (value === null || value === undefined);

export const isNullableOrEmpty = (value) => (isNullable(value) || value === '' || value === []);
