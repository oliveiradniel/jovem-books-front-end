type TSessionBaseErrorMessage =
  | 'O nome de usuário é obrigatório!'
  | 'A senha é obrigatória!'
  | 'O nome de usuário deve ter no mínimo 5 caracteres!'
  | 'A senha do usuário deve ter no mínimo 8 caracteres!';

type TSignInErrorMessage =
  | TSessionBaseErrorMessage
  | 'Suas credenciais não coincidem com uma conta em nosso sistema!';

type TSignUpErrorMessage =
  | TSessionBaseErrorMessage
  | 'O primeiro nome do usuário é obrigatório!'
  | 'O sobrenome do usuário é obrigatório!'
  | 'O e-mail é obrigatório!'
  | 'O primeiro nome do usuário deve ter no mínimo 3 caracteres!'
  | 'O último nome do usuário deve ter no mínimo 3 caracteres!'
  | 'Insira um e-mail válido!'
  | 'O nome de usuário já está em uso!'
  | 'O e-mail já está em uso!';

export type TField =
  | 'title'
  | 'authors'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'credentials';

export interface IFormError {
  field: TField;
  message: TSignInErrorMessage | TSignUpErrorMessage;
}
