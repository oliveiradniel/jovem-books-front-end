import { ChangeEvent, useRef, useState } from 'react';

import { useMutateUpdateUser } from '../../../../app/hooks/mutations/user/useMutateUpdateUser';

import { useErrors } from '../../../../app/hooks/useErrors';

import { sanitizeAndCapitalize } from '../../../../utils/sanitizeAndCapitalize';
import { emitToast } from '../../../../utils/emitToast';

import { UpdateUserSchema } from '../../../../assets/schemas/UserSchema';
import { handleSignUpErrors } from '../../../../app/handleErrors/handleSignUpErrors';
import { handleUploadImageErrors } from '../../../../app/handleErrors/handleUploadImageErrors';

import { ClipLoader } from 'react-spinners';

import FormGroup from '../../../../components/FormGroup';
import Input from './Input';

import {
  TProfileErrorMessages,
  TSessionFields,
} from '../../../../@types/FormError';
import { IUserAPIResponse } from '../../../../@types/User';
import InformationContainer from './InformationContainer';
import UserAvatar from './UserAvatar';
import UserInformation from './UserInformation';

interface ProfileForm {
  user: IUserAPIResponse | null;
  isLoadingUser: boolean;
  isRefetchingUser: boolean;
  isBeingEdited: boolean;
  onEditCancellation: () => void;
}

export default function ProfileForm({
  user,
  isLoadingUser,
  isRefetchingUser,
  isBeingEdited,
  onEditCancellation,
}: ProfileForm) {
  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors<TSessionFields, TProfileErrorMessages>();

  const hasErrorInUsername = getErrorMessageByFieldName(['username']);
  const hasErrorInFirstName = getErrorMessageByFieldName(['firstName']);
  const hasErrorInLastName = getErrorMessageByFieldName(['lastName']);
  const hasErrorInEmail = getErrorMessageByFieldName(['email']);

  const { updateUser, isUpdatingUser } = useMutateUpdateUser({
    currentImagePath: user?.imagePath ?? null,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(
    user?.imagePath ?? null
  );
  const [removeImage, setRemoveImage] = useState(false);

  const isFormValid = errors.length === 0;

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

  function handleRemoveProfilePhoto() {
    setSelectedImage(null);
    setImageName(null);
    setRemoveImage(true);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
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

    if (user?.imagePath) {
      setImageName(user.imagePath);
    }

    setSelectedImage(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      username,
      firstName,
      lastName,
      email,
      file: selectedImage,
      removeImage,
    };

    try {
      const data = UpdateUserSchema.parse({ ...formData, imagePath: null });

      const { imagePath } = await updateUser(data);

      setSelectedImage(null);
      setRemoveImage(false);

      setImageName(imagePath);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      const result = handleSignUpErrors(error);

      if (result) {
        setError(result);

        return;
      }

      const uploadMessageError = handleUploadImageErrors(error);

      if (uploadMessageError) {
        emitToast({
          type: 'error',
          message: uploadMessageError,
        });

        return;
      }

      emitToast({
        type: 'error',
        message: 'Não foi possível atualizar seu usuário.',
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[clamp(340px,64vw,500px)] flex-col items-center justify-center gap-4 rounded-lg"
    >
      <InformationContainer>
        <UserAvatar
          selectedImage={selectedImage}
          imageName={imageName}
          inputRef={inputRef}
          isBeingEdited={isBeingEdited}
          isUpdatingUser={isUpdatingUser}
          isRefetchingUser={isRefetchingUser}
          isLoadingUser={isLoadingUser}
          onImageChange={handleImageChange}
        />

        <div className="bg-navy-blue-2 hidden h-full w-[0.1px] sm:inline-flex" />

        <UserInformation
          firstName={user?.firstName ?? null}
          lastName={user?.lastName ?? null}
          isUpdatingUser={isUpdatingUser}
          isRefetchingUser={isRefetchingUser}
          isLoadingUser={isLoadingUser}
        />
      </InformationContainer>

      <FormGroup error={hasErrorInUsername}>
        <Input
          error={!!(hasErrorInUsername && hasErrorInUsername.length > 0)}
          label="Nome de usuário"
          type="text"
          placeholder={user?.username}
          value={username}
          disabled={!isBeingEdited || isRefetchingUser}
          isLoadingData={!user}
          onChange={handleUsernameChange}
        />
      </FormGroup>

      <FormGroup error={hasErrorInFirstName}>
        <Input
          error={!!(hasErrorInFirstName && hasErrorInFirstName.length > 0)}
          label="Primeiro nome"
          type="text"
          placeholder={user?.firstName}
          value={firstName}
          disabled={!isBeingEdited || isRefetchingUser}
          isLoadingData={!user}
          onChange={handleFirstNameChange}
        />
      </FormGroup>

      <FormGroup error={hasErrorInLastName}>
        <Input
          error={!!(hasErrorInLastName && hasErrorInLastName.length > 0)}
          label="Sobrenome"
          type="text"
          placeholder={user?.lastName}
          value={lastName}
          disabled={!isBeingEdited || isRefetchingUser}
          isLoadingData={!user}
          onChange={handleLastNameChange}
        />
      </FormGroup>

      <FormGroup error={hasErrorInEmail}>
        <Input
          error={!!(hasErrorInEmail && hasErrorInEmail.length > 0)}
          label="E-mail"
          type="text"
          placeholder={user?.email}
          value={email}
          disabled={!isBeingEdited || isRefetchingUser}
          isLoadingData={!user}
          onChange={handleEmailChange}
        />
      </FormGroup>

      {isBeingEdited && (
        <div className="flex w-full flex-col items-stretch justify-between gap-1">
          <button
            type="submit"
            disabled={isUpdatingUser || isRefetchingUser || !isFormValid}
            className={`bg-sky-blue text-snow-white font-roboto hover:bg-sky-blue/90 disabled:bg-light-gray cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default ${(isUpdatingUser || isRefetchingUser) && 'bg-sky-blue!'}`}
          >
            {isUpdatingUser || isRefetchingUser ? (
              <ClipLoader size={16} color="#ffffff" />
            ) : (
              'Salvar alterações'
            )}
          </button>

          <div className="flex gap-1">
            <button
              type="button"
              disabled={isUpdatingUser || isRefetchingUser}
              onClick={handleEditCancellation}
              className="bg-blood-red text-snow-white font-roboto hover:bg-blood-red/90 disabled:bg-light-gray w-full cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={
                isUpdatingUser ||
                isRefetchingUser ||
                (selectedImage === null && imageName === null)
              }
              onClick={handleRemoveProfilePhoto}
              className="bg-blood-red text-snow-white font-roboto hover:bg-blood-red/90 disabled:bg-light-gray w-full cursor-pointer rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-default"
            >
              Remover foto
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
