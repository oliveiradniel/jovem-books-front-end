export type FieldName =
  | 'title'
  | 'authors'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'credentials';

export type ErrorData = {
  fieldName: FieldName;
  message: string;
};
