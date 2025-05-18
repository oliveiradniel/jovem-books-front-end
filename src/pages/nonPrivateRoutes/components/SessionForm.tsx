import { ChangeEvent, useState } from 'react';

import { useErrors } from '../../../app/hooks/useErrors';

import { ZodSchema } from 'zod';

import { sanitizeAndCapitalize } from '../../../utils/sanitizeAndCapitalize';
import { emitToast } from '../../../utils/emitToast';

import { FaUserSecret } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from '../components/Input';
import FormGroup from '../../../components/FormGroup';
import Button from './Button';

import {
  IFormError,
  THandleError,
  TSessionErrorMessages,
  TSessionFields,
} from '../../../@types/FormError';

import { useMutateSession } from '../../../app/hooks/mutations/useMutateSession';

export interface ISessionFormProps<T> {
  type?: 'signIn' | 'signUp' | 'registrationCompleted';
  validationSchema: ZodSchema<T>;
  onSubmit: (credentials: T) => Promise<void>;
  handleErrors: (
    error: THandleError
  ) => IFormError<TSessionFields, TSessionErrorMessages> | null;
}

export default function SessionForm<T>({
  type = 'signIn',
  validationSchema,
  onSubmit,
  handleErrors,
}: ISessionFormProps<T>) {
  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors<TSessionFields, TSessionErrorMessages>();

  const { submitSession, isLoading, hasError } = useMutateSession<T>({
    onSubmit,
  });

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonLabel = type !== 'signUp' ? 'Entrar' : 'Criar';

  const validSignInForm = username.length > 0 && password.length > 0;

  const validSignUpForm =
    username.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  const isFormValid =
    errors.length === 0 &&
    (type === 'signIn' || type === 'registrationCompleted'
      ? validSignInForm
      : validSignUpForm);

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.length === 0) {
      setError({
        field: 'username',
        message: 'O nome de usuário é obrigatório!',
      });
    } else {
      removeError('username');
      removeError('credentials');
    }

    setUsername(value);
  }

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.length === 0) {
      setError({
        field: 'firstName',
        message: 'O primeiro nome do usuário é obrigatório!',
      });
    } else {
      removeError('firstName');
    }

    setFirstName(sanitizeAndCapitalize(value));
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.length === 0) {
      setError({
        field: 'lastName',
        message: 'O sobrenome do usuário é obrigatório!',
      });
    } else {
      removeError('lastName');
    }

    setLastName(sanitizeAndCapitalize(value));
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.length === 0) {
      setError({
        field: 'email',
        message: 'O e-mail é obrigatório!',
      });
    } else {
      removeError('email');
    }

    setEmail(value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.length === 0) {
      setError({
        field: 'password',
        message: 'A senha é obrigatória!',
      });
    } else {
      removeError('password');
      removeError('credentials');
    }

    setPassword(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userData = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const data = validationSchema.parse(userData);

      await submitSession(data);
    } catch (error) {
      const result = handleErrors(error);
      if (result) {
        setError(result);

        return;
      }

      const message =
        type !== 'signUp'
          ? 'Não foi possível verificar suas credenciais.'
          : 'Não foi possível concluir seu cadastro.';

      emitToast({
        type: 'error',
        message,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in flex w-full flex-col gap-4"
    >
      <FormGroup error={getErrorMessageByFieldName(['username'])}>
        <Input
          error={getErrorMessageByFieldName(['username', 'credentials'])}
          autoFocus
          theFieldIsEmpty={username.length > 0}
          Icon={FaUserSecret}
          isLoading={isLoading}
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormGroup>

      {type === 'signUp' && (
        <>
          <FormGroup
            error={getErrorMessageByFieldName(['firstName', 'lastName'])}
          >
            <div className="flex gap-4">
              <Input
                error={getErrorMessageByFieldName(['firstName'])}
                theFieldIsEmpty={firstName.length > 0}
                Icon={FaUser}
                isLoading={isLoading}
                type="text"
                placeholder="Primeiro nome"
                value={firstName}
                onChange={handleFirstNameChange}
              />

              <Input
                error={getErrorMessageByFieldName(['lastName'])}
                theFieldIsEmpty={lastName.length > 0}
                Icon={FaUser}
                isLoading={isLoading}
                type="text"
                placeholder="Sobrenome"
                value={lastName}
                autoCapitalize="on"
                onChange={handleLastNameChange}
              />
            </div>
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName(['email'])}>
            <Input
              error={getErrorMessageByFieldName(['email'])}
              theFieldIsEmpty={email.length > 0}
              Icon={MdEmail}
              isLoading={isLoading}
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>
        </>
      )}

      <FormGroup
        error={getErrorMessageByFieldName(['password', 'credentials'])}
      >
        <Input
          error={getErrorMessageByFieldName(['password', 'credentials'])}
          theFieldIsEmpty={password.length > 0}
          isLoading={isLoading}
          isAPasswordInput
          Icon={RiLockPasswordFill}
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>

      <Button
        label={hasError ? 'Tentar novamente' : buttonLabel}
        isAbsolute={type !== 'registrationCompleted'}
        isSubmitting={isLoading}
        disabled={!isFormValid}
      />
    </form>
  );
}
