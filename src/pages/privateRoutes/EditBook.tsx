import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../app/services/BooksService';
import { env } from '../../config/env';

import { GoArrowLeft } from 'react-icons/go';

import { IBook } from '../../@types/Book';
import { GiBookCover } from 'react-icons/gi';
import { truncateString } from '../../utils/truncateString';
import { ClipLoader } from 'react-spinners';
import { FiTrash2 } from 'react-icons/fi';

export default function EditBook() {
  const [book, setBook] = useState<IBook>({} as IBook);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);

  const [isToRemoveTheBookCover, setIsToRemoveTheBookCover] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

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
          id: id!,
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

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await BooksService.getBookById(id!);

        setBook(bookData);
      } catch {
        navigate('/my-books');
      }
    }

    loadBook();
  }, [id, navigate]);

  return (
    <div className="animate-fade-in">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      >
        <GoArrowLeft size={20} />
      </button>

      <h1 className="text-snow-white font-quicksand mt-12 mb-6 text-2xl font-thin">
        Capa
      </h1>

      <div className="bg-navy-blue flex items-center justify-around rounded-lg py-4">
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

        <p className="text-light-gray font-quicksand font-semibold">
          {truncateString(book.title, 16)}
        </p>

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

      <div className="mt-8">
        <h1 className="text-snow-white font-quicksand mt-12 mb-6 text-2xl font-thin">
          Editar livro
        </h1>

        <form>
          <label htmlFor=""></label>
        </form>
      </div>
    </div>
  );
}
