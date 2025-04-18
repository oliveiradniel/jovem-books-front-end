import { ChangeEvent, useState } from 'react';

import { useErrors } from '../../app/hooks/useErrors';

import AuthService from '../../app/services/AuthService';

import { emitToast } from '../../utils/emitToast';
import { sanitizeAndCapitalize } from '../../utils/sanitizeAndCapitalize';

import { SignUpSchema } from './schemas/SignUpSchema';

import { handleSignUpErrors } from './errors/handleSignUpErrors';

import { FaUserSecret } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './components/Input';
import SessionTemplate from './components/SessionTemplate';
import RegistrationCompleted from './components/RegistrationCompleted';
import FormGroup from '../../components/FormGroup';

export default function SignUp() {
  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [isError, setIsError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTheRegistrationComplete, setIsTheRegistrationComplete] =
    useState(false);

  const isFormValid =
    username.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    errors.length === 0;

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    removeError('username');

    if (value.length === 0) {
      setError({
        field: 'username',
        message: 'O nome de usuário é obrigatório!',
      });
    }

    setUsername(value);
  }

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    removeError('firstName');

    if (value.length === 0) {
      setError({
        field: 'firstName',
        message: 'O primeiro nome do usuário é obrigatório!',
      });
    }

    setFirstName(sanitizeAndCapitalize(value));
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    removeError('lastName');

    if (value.length === 0) {
      setError({
        field: 'lastName',
        message: 'O sobrenome do usuário é obrigatório!',
      });
    }

    setLastName(sanitizeAndCapitalize(value));
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    removeError('email');

    if (value.length === 0) {
      setError({
        field: 'email',
        message: 'O e-mail é obrigatório!',
      });
    }

    setEmail(value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    removeError('password');

    if (value.length === 0) {
      setError({
        field: 'password',
        message: 'A senha é obrigatória!',
      });
    }

    setPassword(value);
  }

  async function handleSubmit() {
    try {
      setIsError(false);
      setIsSubmitting(true);

      const data = SignUpSchema.parse({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      await AuthService.signUp(data);

      setFullName(`${firstName} ${lastName}`);

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      setIsTheRegistrationComplete(true);
    } catch (error) {
      const result = handleSignUpErrors(error);
      if (result) {
        setError(result);

        return;
      }

      setIsError(true);
      emitToast({
        type: 'error',
        message: 'Não foi possível concluir seu cadastro.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SessionTemplate
      title="Criar uma nova conta"
      buttonLabel={isError ? 'Tentar novamente' : 'Criar'}
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar
            sua própria lista de livros e controlar seu progresso de leitura."
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <RegistrationCompleted
        isVisible={isTheRegistrationComplete}
        data={{ fullName, username }}
        fullName={fullName}
        onClose={() => {
          setUsername('');
          setIsTheRegistrationComplete(false);
        }}
      />

      <FormGroup error={getErrorMessageByFieldName(['username'])}>
        <Input
          error={getErrorMessageByFieldName(['username'])}
          autoFocus
          theFieldIsEmpty={username.length > 0}
          Icon={FaUserSecret}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName(['firstName', 'lastName'])}>
        <div className="flex gap-4">
          <Input
            error={getErrorMessageByFieldName(['firstName'])}
            theFieldIsEmpty={firstName.length > 0}
            Icon={FaUser}
            isDisabled={isSubmitting}
            disabled={isSubmitting}
            type="text"
            placeholder="Primeiro nome"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <Input
            error={getErrorMessageByFieldName(['lastName'])}
            theFieldIsEmpty={lastName.length > 0}
            Icon={FaUser}
            isDisabled={isSubmitting}
            disabled={isSubmitting}
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
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName(['password'])}>
        <Input
          error={getErrorMessageByFieldName(['password'])}
          theFieldIsEmpty={password.length > 0}
          isAPasswordInput
          Icon={RiLockPasswordFill}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>
    </SessionTemplate>
  );
}
