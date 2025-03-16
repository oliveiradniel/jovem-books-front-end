import { ChangeEvent, useState } from 'react';

import { authService } from '../app/services/authService';

import { SignUpSchema } from './schemas/SignUpSchema';

import { handleSignUpErrors } from './errors/handleSignUpErrors';

import { sanitizeAndCapitalize } from '../utils/sanitizeAndCapitalize';

import { FaUserSecret } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './components/Input';
import SessionTemplate from './components/SessionTemplate';
import RegistrationCompleted from './components/RegistrationCompleted';
import FormGroup from '../components/FormGroup';

import { ErrorData } from './types/ErrorData';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTheRegistrationComplete, setIsTheRegistrationComplete] =
    useState(false);

  const isFormValid =
    username.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    errorsData.length === 0;

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'username')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'username',
          message: 'O nome de usuário é obrigatório',
        },
      ]);
    }

    setUsername(value);
  }

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'firstName')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'firstName',
          message: 'O primeiro nome do usuário é obrigatório',
        },
      ]);
    }

    setFirstName(sanitizeAndCapitalize(value));
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'lastName')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'lastName',
          message: 'O sobrenome do usuário é obrigatório',
        },
      ]);
    }

    setLastName(sanitizeAndCapitalize(value));
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'email')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'email',
          message: 'O e-mail é obrigatório',
        },
      ]);
    }

    setEmail(value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'password')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'password',
          message: 'A senha é obrigatória',
        },
      ]);
    }

    setPassword(value);
  }

  async function handleSubmit() {
    try {
      const data = SignUpSchema.parse({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      setIsSubmitting(true);

      await authService.signUp(data);

      setFullName(`${firstName} ${lastName}`);

      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      setIsTheRegistrationComplete(true);

      setErrorsData([]);
    } catch (error) {
      const result = handleSignUpErrors(error);
      if (result) {
        setErrorsData((prevState) => [...prevState, result]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SessionTemplate
      title="Criar uma nova conta"
      buttonLabel="Criar"
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar
            sua própria lista de livros e controlar seu progresso de leitura."
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <RegistrationCompleted
        isVisible={isTheRegistrationComplete}
        fullName={fullName}
        onClose={() => {
          setIsTheRegistrationComplete(false);
          setErrorsData([]);
        }}
      />

      <FormGroup fieldName={['username']} errorsData={errorsData}>
        <Input
          autoFocus
          theFieldIsEmpty={username.length > 0}
          Icon={FaUserSecret}
          errorsData={errorsData}
          fieldName="username"
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormGroup>

      <FormGroup fieldName={['firstName', 'lastName']} errorsData={errorsData}>
        <div className="flex gap-4">
          <Input
            theFieldIsEmpty={firstName.length > 0}
            Icon={FaUser}
            errorsData={errorsData}
            fieldName={'firstName'}
            isDisabled={isSubmitting}
            disabled={isSubmitting}
            type="text"
            placeholder="Primeiro nome"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <Input
            theFieldIsEmpty={lastName.length > 0}
            Icon={FaUser}
            errorsData={errorsData}
            fieldName={'lastName'}
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

      <FormGroup fieldName={['email']} errorsData={errorsData}>
        <Input
          theFieldIsEmpty={email.length > 0}
          Icon={MdEmail}
          errorsData={errorsData}
          fieldName={'email'}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup fieldName={['password']} errorsData={errorsData}>
        <Input
          theFieldIsEmpty={password.length > 0}
          isAPasswordInput
          Icon={RiLockPasswordFill}
          errorsData={errorsData}
          fieldName={'password'}
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
