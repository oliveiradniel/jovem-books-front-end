import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useAuth } from '../../../../app/hooks/useAuth';

import { useErrors } from '../../../../app/hooks/useErrors';

import UsersService from '../../../../app/services/UsersService';

import { sanitizeAndCapitalize } from '../../../../utils/sanitizeAndCapitalize';
import { emitToast } from '../../../../utils/emitToast';

import { handleSignUpErrors } from '../../../nonPrivateRoutes/errors/handleSignUpErrors';
import { UpdateUserSchema } from '../../../../assets/schemas/UserSchema';

import { ClipLoader } from 'react-spinners';
import { GiRead } from 'react-icons/gi';

import FormGroup from '../../../../components/FormGroup';
import Input from '../../../../components/BookForm/Input';

import {
  TProfileErrorMessages,
  TSessionFields,
} from '../../../../@types/FormError';
import { IUserAPIResponse } from '../../../../@types/User';
import { env } from '../../../../config/env';

interface ProfileForm {
  user: IUserAPIResponse | null;
  isBeingEdited: boolean;
  onEditCancellation: () => void;
}

export default function ProfileForm({
  isBeingEdited,
  onEditCancellation,
}: ProfileForm) {
  const { user } = useAuth();

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors<TSessionFields, TProfileErrorMessages>();

  const isFirstRender = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : `${env.API_URL}/uploads/users/${imageName}`;

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

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      emitToast({
        type: 'error',
        message: 'Apenas arquivos de imagens JPEG ou PNG são aceitos.',
      });
      return;
    }

    setSelectedImage(file);
  }

  function handleEditCancellation() {
    onEditCancellation();

    removeError('username');
    removeError('firstName');
    removeError('lastName');
    removeError('email');

    setUsername(user?.username);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
    setSelectedImage(null);

    isFirstRender.current = true;
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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

      onEditCancellation();
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
    if (isFirstRender.current) {
      if (!user?.imagePath) {
        setImageName(null);
        return;
      }
      setImageName(user?.imagePath);

      isFirstRender.current = false;
    }
  }, [user?.imagePath]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[clamp(340px,64vw,500px)] flex-col items-center justify-center gap-4 rounded-lg p-5"
    >
      <div className="bg-navy-blue/40 mb-4 flex h-[100px] w-full items-center gap-4 rounded-lg px-4 py-2">
        <div className="relative flex items-center justify-center">
          <input
            id="profile-photo"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {isBeingEdited && (!selectedImage || user?.imagePath) && (
            <button
              type="button"
              onClick={() => document.getElementById('profile-photo')?.click()}
              className="text-sky-blue hover:text-sky-blue/80 absolute z-1 flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors duration-300 ease-in-out"
            >
              <span className="text-[12px]">
                Clique para selecionar a foto de perfil
              </span>
            </button>
          )}
          {user?.imagePath || selectedImage ? (
            <img
              src={src}
              alt="Foto de Perfil"
              className="h-[90px] w-[90px] rounded-full object-cover"
            />
          ) : (
            <GiRead
              size={70}
              className={`text-sky-blue/60 transition-opacity duration-300 ease-in-out ${isBeingEdited && 'opacity-20'}`}
            />
          )}
        </div>

        <div className="bg-navy-blue-2 flex h-full w-[0.1px]" />

        <div className="h-full flex-1 py-2">
          <p className="font-quicksand text-sky-blue text-end text-[14px] font-semibold">
            {`${user?.firstName} ${user?.lastName}`}
          </p>
          <p className="font-quicksand text-light-gray mt-2 text-end text-[12px]">
            Total de livros cadastrados: {user?._count.books}
          </p>
          <p className="font-quicksand text-light-gray text-end text-[12px]">
            Total de livros lidos: {user?.booksReading}
          </p>
        </div>
      </div>

      <FormGroup error={getErrorMessageByFieldName(['username'])}>
        <Input
          error={getErrorMessageByFieldName(['username'])}
          label="Nome de usuário"
          type="text"
          placeholder={user?.username}
          value={username}
          disabled={!isBeingEdited}
          isLoadingData={!user}
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
          isLoadingData={!user}
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
          isLoadingData={!user}
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
          isLoadingData={!user}
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
  );
}
