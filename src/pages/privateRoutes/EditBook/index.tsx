import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';
import { env } from '../../../config/env';

import { GoArrowLeft } from 'react-icons/go';

import { IBook } from '../../../@types/Book';
import { GiBookCover } from 'react-icons/gi';

import { ClipLoader } from 'react-spinners';
import { FiTrash2 } from 'react-icons/fi';
import { formatAuthors } from '../../../utils/formatAuthors';
import ConfirmationModal from './components/ConfirmationModal';

export default function EditBook() {
  const [book, setBook] = useState<IBook>({} as IBook);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');

  const [isUpdatingBook, setIsUpdatingBook] = useState(false);
  const [isUpdatingBookCover, setIsUpdatingBookCover] = useState(false);

  const [isToRemoveTheBookCover, setIsToRemoveTheBookCover] = useState(false);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const src = selectedImage
    ? URL.createObjectURL(selectedImage)
    : `${env.API_URL}/uploads/books/${book.imagePath}`;

  const formattedAuthors = formatAuthors({
    authors: book.authors,
    onlyCommas: true,
  });

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

  function handleAuthorsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\s+/g, ' ');

    setAuthors(value);
  }

  async function handleDeleteBook() {
    try {
      await BooksService.delete(id!);

      navigate('/my-books');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsUpdatingBook(true);

      const formData = {
        title,
        authors: authors
          .split(',')
          .map((author) => author.trim())
          .filter((author) => author !== ''),
        sinopse,
      };

      const updatedBook = await BooksService.updateBook({
        id: id!,
        ...formData,
      });

      setBook(updatedBook);

      setTitle(updatedBook.title);
      setAuthors(
        formatAuthors({ authors: updatedBook.authors, onlyCommas: true })
      );
      setSinopse(updatedBook.sinopse ?? '');
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingBook(false);
    }
  }

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await BooksService.getBookById(id!);

        setBook(bookData);

        setTitle(bookData.title);
        setAuthors(formattedAuthors);
        setSinopse(bookData.sinopse ?? '');
      } catch {
        navigate('/my-books');
      }
    }

    loadBook();
  }, [id, navigate, formattedAuthors]);

  return (
    <>
      <ConfirmationModal
        bookTitle={book.title}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleDeleteBook}
      />

      <div className="animate-fade-in overflow-y-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          <GoArrowLeft size={20} />
        </button>

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
              onClick={() =>
                setIsToRemoveTheBookCover((prevState) => !prevState)
              }
              className={`text-snow-white flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out ${book.imagePath === null ? 'bg-light-gray/70' : 'bg-blood-red hover:bg-blood-red/70 hover:cursor-pointer'}`}
            >
              {!isToRemoveTheBookCover ? <FiTrash2 /> : <span>X</span>}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-snow-white font-quicksand mt-6 mb-6 text-2xl font-thin">
            Livro
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-lg py-4"
          >
            <div className="flex items-center gap-2">
              <label
                htmlFor="title"
                className="text-snow-white font-quicksand w-16"
              >
                Título
              </label>
              <input
                type="text"
                name="title"
                placeholder="Título do livro"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-8 w-full rounded-lg border px-2 transition-colors duration-300 ease-in-out outline-none"
              />
            </div>

            <div>
              <span className="font-quicksand text-light-gray text-xs">
                Separe os autores(as) por vírgula.
              </span>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="title"
                  className="text-snow-white font-quicksand w-16"
                >
                  Autores
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Autores(as)"
                  value={authors}
                  onChange={handleAuthorsChange}
                  className="text-sky-blue/80 font-quicksand focus:border-sky-blue/40 border-navy-blue placeholder:text-light-gray h-8 w-full rounded-lg border px-2 transition-colors duration-300 ease-in-out outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <label
                htmlFor="title"
                className="text-snow-white font-quicksand w-16"
              >
                Sinopse
              </label>
              <textarea
                name="title"
                placeholder="Sinopse do livro"
                value={sinopse}
                onChange={(event) => setSinopse(event.target.value)}
                className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className={`bg-sky-blue text-snow-white font-roboto flex w-full items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors duration-300 ease-in-out ${isUpdatingBook ? 'hover:cursor-default' : 'hover:bg-sky-blue-op-94 hover:cursor-pointer'}`}
              >
                {isUpdatingBook && <ClipLoader color="#ffffff" size={20} />}
                Salvar alterações
              </button>

              <button
                type="button"
                onClick={() => setIsConfirmationModalVisible(true)}
                className={`text-snow-white bg-blood-red hover:bg-blood-red/70 flex h-10 w-12 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:cursor-pointer`}
              >
                <FiTrash2 />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
