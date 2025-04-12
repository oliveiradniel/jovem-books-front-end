import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import BooksService from '../../../../app/services/BooksService';

import { env } from '../../../../config/env';

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
    if (file) {
      setSelectedImage(file);
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

        console.log(updatedBook);

        setSelectedImage(null);
        setImageName(updatedBook.imagePath);
        setIsToRemoveTheBookCover(false);
        if (!selectedImage) setSelectedImage(null);
      } catch (error) {
        console.log(error);
      } finally {
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
              onChange={handleImageChange}
              className="hidden"
            />
          </SaveButton>

          <DeleteButton
            buttonLabel={
              !isToRemoveTheBookCover ? (
                <FiTrash2 />
              ) : (
                <span className="font-quicksand">X</span>
              )
            }
            disabled={
              isUpdatingBookCover ||
              isUpdatingBook ||
              !imageName ||
              isLoadingBook
            }
            onClick={() => setIsToRemoveTheBookCover((prevState) => !prevState)}
          />
        </div>
      </div>
    </div>
  );
}
