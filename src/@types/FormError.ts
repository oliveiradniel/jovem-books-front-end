export type Field =
  | 'title'
  | 'authors'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'credentials';

export type FormError = {
  field: Field;
  message: string;
};
