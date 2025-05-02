import { useAuth } from '../../../app/hooks/useAuth';

import { FaUser } from 'react-icons/fa';
import FormGroup from '../../../components/FormGroup';
import { useErrors } from '../../../app/hooks/useErrors';
import { ChangeEvent, useState } from 'react';
import {
  TProfileErrorMessages,
  TSessionFields,
} from '../../../@types/FormError';
import Input from '../../../components/BookForm/Input';
import { sanitizeAndCapitalize } from '../../../utils/sanitizeAndCapitalize';

export default function Profile() {
  const { user } = useAuth();

  const { setError, removeError, getErrorMessageByFieldName } = useErrors<
    TSessionFields,
    TProfileErrorMessages
  >();

  const [username, setUsername] = useState(user?.username || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');

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

  return (
    <div className="flex flex-col items-center">
      <form className="flex min-h-[580px] w-[clamp(340px,64vw,500px)] flex-col items-center justify-center gap-4 rounded-lg p-5">
        <div className="border-sky-blue/20 mb-10 rounded-full border p-6">
          {user?.imagePath ? (
            <img src={user.imagePath} alt="Foto de Perfil" />
          ) : (
            <FaUser size={40} className="text-sky-blue/60" />
          )}
        </div>

        <FormGroup error={getErrorMessageByFieldName(['username'])}>
          <Input
            error={getErrorMessageByFieldName(['username'])}
            label="Nome de usuário"
            type="text"
            placeholder={username}
            value={username}
            onChange={handleUsernameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['firstName'])}>
          <Input
            error={getErrorMessageByFieldName(['firstName'])}
            label="Primeiro nome"
            type="text"
            placeholder={firstName}
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['lastName'])}>
          <Input
            error={getErrorMessageByFieldName(['lastName'])}
            label="Sobrenome"
            type="text"
            placeholder={lastName}
            value={lastName}
            onChange={handleLastNameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['email'])}>
          <Input
            error={getErrorMessageByFieldName(['email'])}
            label="E-mail"
            type="text"
            placeholder={email}
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>

        <div className="mt-6 flex w-full flex-col items-stretch justify-between gap-2">
          <button
            type="button"
            className="bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue/90 cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
          >
            Editar
          </button>
          <button
            type="button"
            className="bg-blood-red text-snow-white/70 font-roboto hover:bg-blood-red/90 cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
          >
            Excluir usuário
          </button>
        </div>
      </form>
    </div>
  );
}
