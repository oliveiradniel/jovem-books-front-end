import { ChangeEvent, useEffect, useState } from 'react';

import { useAuth } from '../../../app/hooks/useAuth';

import { useErrors } from '../../../app/hooks/useErrors';

import { sanitizeAndCapitalize } from '../../../utils/sanitizeAndCapitalize';

import { FaUser } from 'react-icons/fa';

import Input from '../../../components/BookForm/Input';
import FormGroup from '../../../components/FormGroup';

import {
  TProfileErrorMessages,
  TSessionFields,
} from '../../../@types/FormError';
import { UpdateUserSchema } from '../../../assets/schemas/UserSchema';
import UsersService from '../../../app/services/UsersService';
import { handleSignUpErrors } from '../../nonPrivateRoutes/errors/handleSignUpErrors';
import { emitToast } from '../../../utils/emitToast';
import { ClipLoader } from 'react-spinners';

export default function Profile() {
  const { user } = useAuth();

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors<TSessionFields, TProfileErrorMessages>();

  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    errors.length === 0 &&
    (username !== user?.username ||
      firstName !== user?.firstName ||
      lastName !== user?.lastName ||
      email !== user?.email);

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value.trim().length === 0) {
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

    if (value.trim().length === 0) {
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

    if (value.trim().length === 0) {
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

    if (value.trim().length === 0) {
      setError({
        field: 'email',
        message: 'O e-mail é obrigatório!',
      });
    } else {
      removeError('email');
    }

    setEmail(value);
  }

  function handleEditCancellation() {
    setIsBeingEdited(false);

    setUsername(user?.username);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = {
        username,
        firstName,
        lastName,
        email,
      };

      const data = UpdateUserSchema.parse(formData);

      const updatedUser = await UsersService.updateUser(data);

      setUsername(updatedUser.username);
      setFirstName(updatedUser.firstName);
      setLastName(updatedUser.lastName);
      setEmail(updatedUser.email);

      emitToast({
        type: 'success',
        message: 'Usuário atualizado com sucesso.',
      });

      setIsBeingEdited(false);
    } catch (error) {
      const result = handleSignUpErrors(error);
      if (result) {
        setError(result);

        return;
      }

      emitToast({
        type: 'error',
        message: 'Não foi possível atualizar seu usuário.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setUsername(user?.username);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
  }, [user?.username, user?.firstName, user?.lastName, user?.email]);

  return (
    <div className="flex min-h-[580px] flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-[clamp(340px,64vw,500px)] flex-col items-center justify-center gap-4 rounded-lg p-5"
      >
        <div className="border-sky-blue/20 mb-10 rounded-full border p-6">
          {user?.imagePath ? (
            <img src={user.imagePath} alt="Foto de Perfil" />
          ) : (
            <FaUser size={40} className="text-sky-blue/60" />
          )}
        </div>

        <FormGroup error={getErrorMessageByFieldName(['username'])}>
          <Input
            autoFocus={isBeingEdited}
            error={getErrorMessageByFieldName(['username'])}
            label="Nome de usuário"
            type="text"
            placeholder={user?.username}
            value={username}
            disabled={!isBeingEdited}
            onChange={handleUsernameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['firstName'])}>
          <Input
            error={getErrorMessageByFieldName(['firstName'])}
            label="Primeiro nome"
            type="text"
            placeholder={user?.firstName}
            value={firstName}
            disabled={!isBeingEdited}
            onChange={handleFirstNameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['lastName'])}>
          <Input
            error={getErrorMessageByFieldName(['lastName'])}
            label="Sobrenome"
            type="text"
            placeholder={user?.lastName}
            value={lastName}
            disabled={!isBeingEdited}
            onChange={handleLastNameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['email'])}>
          <Input
            error={getErrorMessageByFieldName(['email'])}
            label="E-mail"
            type="text"
            placeholder={user?.email}
            value={email}
            disabled={!isBeingEdited}
            onChange={handleEmailChange}
          />
        </FormGroup>

        {isBeingEdited && (
          <div className="mt-6 flex w-full flex-col items-stretch justify-between gap-2">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue/90 disabled:bg-light-gray cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default ${isSubmitting && 'bg-sky-blue!'}`}
            >
              {isSubmitting ? (
                <ClipLoader size={16} color="#ffffff" />
              ) : (
                'Salvar alterações'
              )}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleEditCancellation}
              className="bg-blood-red text-snow-white font-roboto hover:bg-blood-red/90 disabled:bg-light-gray cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default"
            >
              Cancelar
            </button>
          </div>
        )}
      </form>

      {!isBeingEdited && (
        <div className="flex w-[clamp(340px,64vw,500px)] flex-col items-stretch justify-center gap-2 p-5">
          <button
            type="button"
            onClick={() => setIsBeingEdited(true)}
            className="bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue/90 cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
          >
            Editar
          </button>

          <button
            type="button"
            className="bg-blood-red text-snow-white font-roboto hover:bg-blood-red/90 cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out"
          >
            Excluir usuário
          </button>
        </div>
      )}
    </div>
  );
}
