import { env } from '../../../../config/env';

import { GiRead } from 'react-icons/gi';

import SkeletonLoading from '../../../../components/SkeletonLoading';

interface UserAvatarProps {
  selectedImage: File | null;
  imageName: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isBeingEdited: boolean;
  isUpdatingUser: boolean;
  isRefetchingUser: boolean;
  isLoadingUser: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserAvatar({
  selectedImage,
  imageName,
  inputRef,
  isBeingEdited,
  isUpdatingUser,
  isRefetchingUser,
  isLoadingUser,
  onImageChange,
}: UserAvatarProps) {
  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : `${env.VITE_AWS_BUCKET_URL}/${imageName}`;

  return (
    <div className="bg-navy-blue/40 relative flex h-[100px] w-[100px] items-center justify-center rounded-full sm:h-[90px] sm:w-[90px] sm:bg-transparent">
      <input
        id="user-avatar"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />
      {isBeingEdited && (
        <button
          type="button"
          disabled={isUpdatingUser || isRefetchingUser}
          onClick={() => document.getElementById('user-avatar')?.click()}
          className={`text-sky-blue absolute z-1 flex h-full w-full cursor-pointer flex-col items-center justify-center text-[12px] transition-all duration-300 ease-in-out disabled:cursor-default disabled:opacity-40 ${isRefetchingUser ? 'text-sky-blue' : 'hover:text-sky-blue/80'}`}
        >
          Selecione a foto de perfil
        </button>
      )}

      {isLoadingUser && <SkeletonLoading rounded="full" />}

      {(imageName !== null || selectedImage !== null) && !isLoadingUser ? (
        <img
          src={src}
          alt="Foto de Perfil"
          className={`h-[90px] w-[90px] rounded-full object-cover transition-opacity duration-300 ease-in-out ${isBeingEdited && 'opacity-20'}`}
        />
      ) : (
        !isLoadingUser && (
          <GiRead
            size={70}
            className={`text-sky-blue/60 transition-opacity duration-300 ease-in-out ${isBeingEdited && 'opacity-20'} ${isRefetchingUser && !isBeingEdited && 'opacity-40'}`}
          />
        )
      )}
    </div>
  );
}
