export type FieldName =
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password';

export type ErrorData = {
  fieldName: FieldName;
  message: string;
};
