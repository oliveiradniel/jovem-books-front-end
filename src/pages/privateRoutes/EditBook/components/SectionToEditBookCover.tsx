import { useState } from 'react';

import { env } from '../../../../config/env';

import { FiTrash2 } from 'react-icons/fi';
import { GiBookCover } from 'react-icons/gi';
import { ClipLoader } from 'react-spinners';

import { IBook } from '../../../../@types/Book';
import BooksService from '../../../../app/services/BooksService';

interface EditBookCoverProps {
  book: IBook;
  setBook: (book: IBook) => void;
}

export default function SectionToEditBookCover({
  book,
  setBook,
}: EditBookCoverProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);

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

  async function handleBookCoverUpdate() {
    if (selectedImage || isToRemoveTheBookCover) {
      try {
        setIsUpdatingBookCover(true);

        const updatedBook = await BooksService.updateImage({
          id: book.id,
          image: selectedImage,
        });

        setBook(updatedBook);
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
      <h1 className="text-snow-white font-quicksand mt-6 mb-6 text-2xl font-thin">
        Capa
      </h1>

      <div className="bg-navy-blue/80 flex items-center justify-between rounded-lg px-4 py-4">
        {(book.imagePath || selectedImage) && !isToRemoveTheBookCover ? (
          <img
            src={src}
            alt="Capa do Livro"
            className="h-[65px] w-[65px] rounded-full"
          />
        ) : (
          <div className="border-sky-blue-op-60 flex h-[65px] w-[65px] items-center justify-center rounded-full border">
            <GiBookCover size={45} color="#03a9f494 " />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleBookCoverUpdate}
            className={`bg-sky-blue text-snow-white font-roboto flex w-[140px] items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors duration-300 ease-in-out ${isUpdatingBookCover ? 'hover:cursor-default' : 'hover:bg-sky-blue-op-94 hover:cursor-pointer'}`}
          >
            {isUpdatingBookCover && <ClipLoader color="#ffffff" size={20} />}
            {!isUpdatingBookCover &&
              (selectedImage || isToRemoveTheBookCover
                ? 'Salvar'
                : book.imagePath
                  ? 'Alterar capa'
                  : 'Adicionar capa')}
            <input
              id="book-cover"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </button>

          <button
            type="button"
            onClick={() => setIsToRemoveTheBookCover((prevState) => !prevState)}
            className={`text-snow-white flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out ${book.imagePath === null ? 'bg-light-gray/70' : 'bg-blood-red hover:bg-blood-red/70 hover:cursor-pointer'}`}
          >
            {!isToRemoveTheBookCover ? <FiTrash2 /> : <span>X</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
