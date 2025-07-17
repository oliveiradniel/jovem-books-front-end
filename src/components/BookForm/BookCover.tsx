import { ChangeEvent, useRef } from 'react';

import { FiTrash2 } from 'react-icons/fi';
import { MdOutlinePermMedia } from 'react-icons/md';

import ButtonChooseImage from './ButtonChooseImage';
import DeleteButton from './DeleteButton';
import SkeletonLoading from '../SkeletonLoading';

interface BookCoverProps {
  imageName: string | null;
  selectedImage: File | null;
  src: string;
  isUpdating: boolean;
  isLoadingBook: boolean;
  removeImage: boolean;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImageFromScreen: () => void;
}

export default function BookCover({
  imageName,
  selectedImage,
  src,
  isUpdating,
  isLoadingBook,
  removeImage,
  onImageChange,
  onRemoveImageFromScreen,
}: BookCoverProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleRemoveImageFromScreen() {
    onRemoveImageFromScreen();

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div>
      <div className="bg-blue-black/40 flex items-center justify-between rounded-lg px-4 py-4">
        <div className="relative flex h-[65px] w-[65px] items-center justify-center rounded-full">
          {isLoadingBook ? (
            <SkeletonLoading rounded="full" />
          ) : (selectedImage || imageName) && !removeImage ? (
            <img
              src={src}
              alt="Capa do Livro"
              className="h-[65px] w-[65px] rounded-full object-cover"
            />
          ) : (
            !isLoadingBook && <MdOutlinePermMedia size={45} color="#adadad40" />
          )}
        </div>

        <div className="flex gap-2">
          <ButtonChooseImage
            buttonLabel={
              imageName && !removeImage ? 'Alterar capa' : 'Adicionar capa'
            }
            disabled={isUpdating || isLoadingBook || selectedImage !== null}
            onClick={() => inputRef.current?.click()}
          >
            <input
              id="book-cover"
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
          </ButtonChooseImage>

          <DeleteButton
            buttonLabel={
              !removeImage && !selectedImage ? (
                <FiTrash2 />
              ) : (
                <span className="font-quicksand">X</span>
              )
            }
            disabled={
              isUpdating || isLoadingBook || (!imageName && !selectedImage)
            }
            onClick={handleRemoveImageFromScreen}
          />
        </div>
      </div>
    </div>
  );
}
