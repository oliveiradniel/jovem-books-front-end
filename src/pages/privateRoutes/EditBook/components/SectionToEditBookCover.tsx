import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutateUpdateBookImage } from '../../../../app/hooks/mutations/book/useMutateUpdateBookImage';

import { env } from '../../../../config/env';

import { emitToast } from '../../../../utils/emitToast';

import { FiTrash2 } from 'react-icons/fi';
import { MdOutlinePermMedia } from 'react-icons/md';

import SaveButton from './SaveButton';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import DeleteButton from '../../../../components/BookForm/DeleteButton';

interface EditBookCoverProps {
  imagePath: string | null;
  isLoadingBook: boolean;
  isUpdatingBook: boolean;
}

export default function SectionToEditBookCover({
  imagePath,
  isLoadingBook,
  isUpdatingBook,
}: EditBookCoverProps) {
  const { id } = useParams();

  const isFirstRender = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { submitBookImage, isUpdatingBookImage } = useMutateUpdateBookImage();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const [removeImage, setRemoveImage] = useState(false);

  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : `${env.VITE_AWS_BUCKET_URL}/${imageName}`;

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

  function handleRemoveImageFromScreen() {
    if (imageName && selectedImage === null && !removeImage) {
      setRemoveImage(true);
      return;
    }

    if (imageName && selectedImage === null && removeImage) {
      setRemoveImage(false);
      return;
    }

    setRemoveImage(false);
    setSelectedImage(null);
  }

  async function handleSubmit() {
    if (selectedImage || removeImage) {
      const updatedBook = await submitBookImage({
        id: id!,
        file: selectedImage,
        removeImage: removeImage,
      });

      setSelectedImage(null);
      setRemoveImage(false);

      setImageName(updatedBook.imagePath);
    } else {
      document.getElementById('book-cover')?.click();
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      if (!imagePath) {
        setImageName(null);
        return;
      }
      setImageName(imagePath);

      isFirstRender.current = false;
    }
  }, [imagePath]);

  return (
    <div>
      <div className="bg-blue-black/40 flex items-center justify-between rounded-lg px-4 py-4">
        <div className="relative flex h-[65px] w-[65px] items-center justify-center rounded-full">
          {isLoadingBook && <SkeletonLoading rounded="full" />}

          {!isLoadingBook &&
            ((selectedImage || imageName) && !removeImage ? (
              <img
                src={src}
                alt="Capa do Livro"
                className="h-[65px] w-[65px] rounded-full object-cover"
              />
            ) : (
              <MdOutlinePermMedia size={45} color="#adadad40" />
            ))}
        </div>

        <div className="flex gap-2">
          <SaveButton
            buttonLabel={
              selectedImage || removeImage
                ? 'Salvar'
                : imagePath
                  ? 'Alterar capa'
                  : 'Adicionar capa'
            }
            disabled={isUpdatingBookImage || isUpdatingBook || isLoadingBook}
            isLoading={isUpdatingBookImage}
            isLoadingOther={isUpdatingBook || isLoadingBook}
            onClick={handleSubmit}
          >
            <input
              id="book-cover"
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </SaveButton>

          <DeleteButton
            buttonLabel={
              !removeImage && !selectedImage ? (
                <FiTrash2 />
              ) : (
                <span className="font-quicksand">X</span>
              )
            }
            disabled={
              isUpdatingBookImage ||
              isUpdatingBook ||
              (!imageName && !selectedImage) ||
              isLoadingBook
            }
            onClick={handleRemoveImageFromScreen}
          />
        </div>
      </div>
    </div>
  );
}
