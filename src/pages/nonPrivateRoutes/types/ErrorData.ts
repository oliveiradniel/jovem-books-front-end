export type FieldName =
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
