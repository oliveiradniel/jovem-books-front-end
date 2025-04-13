import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import BooksService from '../../../../app/services/BooksService';

import { env } from '../../../../config/env';

import { emitToast } from '../../../../utils/emitToast';

import { FiTrash2 } from 'react-icons/fi';
import { MdOutlinePermMedia } from 'react-icons/md';

import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';
import SkeletonLoading from '../../../../components/SkeletonLoading';

interface EditBookCoverProps {
  imagePath: string | null;
  isLoadingBook: boolean;
  isUpdatingBook: boolean;
  isUpdatingBookCover: boolean;
  setIsUpdatingBookCover: (value: boolean) => void;
}

export default function SectionToEditBookCover({
  imagePath,
  isLoadingBook,
  isUpdatingBook,
  isUpdatingBookCover,
  setIsUpdatingBookCover,
}: EditBookCoverProps) {
  const { id } = useParams();

  const isFirstRender = useRef(true);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const [isToRemoveTheBookCover, setIsToRemoveTheBookCover] = useState(false);

  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : `${env.API_URL}/uploads/books/${imageName}`;

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

    if (file) {
      setSelectedImage(file);
    }
  }

  function handleRemoveImageFromScreen() {
    if (selectedImage) {
      setSelectedImage(null);
    } else if (!selectedImage) {
      setIsToRemoveTheBookCover(true);
    }
  }

  async function handleSubmit() {
    if (selectedImage || isToRemoveTheBookCover) {
      try {
        setIsUpdatingBookCover(true);

        const updatedBook = await BooksService.updateImage({
          id: id!,
          image: selectedImage,
        });

        if (selectedImage) {
          emitToast({ type: 'success', message: 'Capa alterada com sucesso.' });
        } else {
          emitToast({ type: 'success', message: 'Capa excluída com sucesso.' });
        }

        setImageName(updatedBook.imagePath);
        if (!selectedImage) setSelectedImage(null);
      } catch {
        if (selectedImage) {
          emitToast({
            type: 'error',
            message: 'Não foi possível alterar a capa do livro.',
          });
        } else {
          emitToast({
            type: 'error',
            message: 'Não foi possível excluir a capa do livro.',
          });
        }
      } finally {
        setSelectedImage(null);
        setIsToRemoveTheBookCover(false);
        setIsUpdatingBookCover(false);
      }
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
            ((selectedImage || imageName) && !isToRemoveTheBookCover ? (
              <img
                src={src}
                alt="Capa do Livro"
                className="h-[65px] w-[65px] rounded-full"
              />
            ) : (
              <MdOutlinePermMedia size={45} color="#adadad40" />
            ))}
        </div>

        <div className="flex gap-2">
          <SaveButton
            buttonLabel={
              selectedImage || isToRemoveTheBookCover
                ? 'Salvar'
                : imagePath
                  ? 'Alterar capa'
                  : 'Adicionar capa'
            }
            disabled={isUpdatingBookCover || isUpdatingBook || isLoadingBook}
            isLoading={isUpdatingBookCover}
            isLoadingOther={isUpdatingBook || isLoadingBook}
            onClick={handleSubmit}
          >
            <input
              id="book-cover"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </SaveButton>

          <DeleteButton
            buttonLabel={
              !isToRemoveTheBookCover && !selectedImage ? (
                <FiTrash2 />
              ) : (
                <span className="font-quicksand">X</span>
              )
            }
            disabled={
              isUpdatingBookCover ||
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
