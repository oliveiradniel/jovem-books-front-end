import { useState } from 'react';

import BooksService from '../../../../app/services/BooksService';

import { env } from '../../../../config/env';

import { FiTrash2 } from 'react-icons/fi';
import { MdOutlinePermMedia } from 'react-icons/md';

import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

import { IBook } from '../../../../@types/Book';

interface EditBookCoverProps {
  book: IBook;
  setBook: (book: IBook) => void;
  isUpdatingBook: boolean;
  isUpdatingBookCover: boolean;
  setIsUpdatingBookCover: (value: boolean) => void;
}

export default function SectionToEditBookCover({
  book,
  isUpdatingBook,
  isUpdatingBookCover,
  setIsUpdatingBookCover,
}: EditBookCoverProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isToRemoveTheBookCover, setIsToRemoveTheBookCover] = useState(false);

  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : `${env.API_URL}/uploads/books/${book.imagePath}`;

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      setSelectedImage(file);

      reader.onload = (e) => {
        const img = document.getElementById('book-cover') as HTMLImageElement;
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit() {
    if (selectedImage || isToRemoveTheBookCover) {
      try {
        setIsUpdatingBookCover(true);

        await BooksService.updateImage({
          id: book.id,
          image: selectedImage,
        });

        setSelectedImage(null);
        setIsToRemoveTheBookCover(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdatingBookCover(false);
      }
    } else {
      document.getElementById('book-cover')?.click();
    }
  }

  return (
    <div>
      <div className="bg-blue-black/40 flex items-center justify-between rounded-lg px-4 py-4">
        {(book.imagePath || selectedImage) && !isToRemoveTheBookCover ? (
          <img
            src={src}
            alt="Capa do Livro"
            className="h-[65px] w-[65px] rounded-full"
          />
        ) : (
          <div className="flex h-[65px] w-[65px] items-center justify-center">
            <MdOutlinePermMedia size={45} color="#adadad40" />
          </div>
        )}

        <div className="flex gap-2">
          <SaveButton
            buttonLabel={
              selectedImage || isToRemoveTheBookCover
                ? 'Salvar'
                : book.imagePath
                  ? 'Alterar capa'
                  : 'Adicionar capa'
            }
            disabled={isUpdatingBookCover || isUpdatingBook}
            isLoading={isUpdatingBookCover}
            isLoadingOther={isUpdatingBook}
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
              isUpdatingBookCover || isUpdatingBook || book.imagePath === null
            }
            onClick={() => setIsToRemoveTheBookCover((prevState) => !prevState)}
          />
        </div>
      </div>
    </div>
  );
}
