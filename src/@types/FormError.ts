type TSessionBaseErrorMessages =
  | 'O nome de usuário é obrigatório!'
  | 'A senha é obrigatória!'
  | 'O nome de usuário deve ter no mínimo 5 caracteres!'
  | 'A senha do usuário deve ter no mínimo 8 caracteres!';

export type TSignInErrorMessages =
  | TSessionBaseErrorMessages
  | 'Suas credenciais não coincidem com uma conta em nosso sistema!';

export type TSignUpErrorMessages =
  | TSessionBaseErrorMessages
  | 'O primeiro nome do usuário é obrigatório!'
  | 'O sobrenome do usuário é obrigatório!'
  | 'O e-mail é obrigatório!'
  | 'O primeiro nome do usuário deve ter no mínimo 3 caracteres!'
  | 'O último nome do usuário deve ter no mínimo 3 caracteres!'
  | 'Insira um e-mail válido!'
  | 'O nome de usuário já está em uso!'
  | 'O e-mail já está em uso!';

export type TSessionErrorMessages = TSignInErrorMessages | TSignUpErrorMessages;

export type TBookErrorMessages =
  | 'O título do livro deve ter no mínimo 3 caracteres!'
  | 'O nome do autor deve ter no mínimo 3 caracteres!'
  | 'O título do livro já está em uso!'
  | 'O título do livro é obrigatório!'
  | 'O livro deve conter ao menos um autor(a)!'
  | 'O livro deve conter ao menos um gênero literário!';

export type TBookFields = 'title' | 'authors' | 'sinopse' | 'literaryGenre';

export type TSessionFields =
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'credentials';

export interface IFormError<T, K> {
  field: T;
  message: K;
}
