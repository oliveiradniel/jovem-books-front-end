import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BooksService from '../../../app/services/BooksService';

import { CreateBookSchema } from '../../../assets/schemas/BookSchemas';

import AuthorsMapper from '../../../app/services/mappers/AuthorsMapper';

import { emitToast } from '../../../utils/emitToast';

import { GoArrowLeft } from 'react-icons/go';

import BookForm, { BookFormHandle } from '../../../components/BookForm';

import { LITERARY_GENRE_OPTIONS } from '../../../constants/books';

import { IBookAPI, TCreateBook } from '../../../@types/Book';
import { IPreSignedURL, TMimeType } from '@/@types/S3';

export default function NewBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const book = useMemo(
    () => (location.state?.book as IBookAPI) || {},
    [location.state?.book]
  );

  const bookFormRef = useRef<BookFormHandle>(null);

  async function handleSubmit(book: TCreateBook) {
    let data: IPreSignedURL | null = null;

    const { file } = book;

    if (file !== null) {
      data = await BooksService.getPreSignedURL({
        mimeType: file.type as TMimeType,
        fileSize: file.size,
      });
    }

    console.log({ data });
    console.log({ book });

    // await BooksService.createBook({ ...book, imagePath: data?.key });

    // if (data !== null && file !== null) {
    //   await S3Service.uploadImageS3({ preSignedURL: data.url, file });
    // }

    // bookFormRef.current?.resetFields();

    emitToast({ type: 'success', message: 'Livro criado com sucesso.' });
  }

  useEffect(() => {
    if (book) {
      let authors = AuthorsMapper.toDomain({
        authors: book.authors,
      });

      if (authors === null) {
        authors = '';
      }

      let literaryGenre = book.literaryGenre?.map(
        (literaryGenre) => literaryGenre.toUpperCase() as string
      );

      literaryGenre = literaryGenre?.filter((item) =>
        LITERARY_GENRE_OPTIONS.includes(item)
      );

      if (!literaryGenre) {
        literaryGenre = [];
      }

      bookFormRef.current?.setFieldValues({
        ...book,
        authors,
        literaryGenre,
      });
    }
  }, [book]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          <GoArrowLeft size={20} />
        </button>

        <h1 className="font-quicksand text-snow-white text-2xl">Novo livro</h1>
      </div>

      <BookForm
        ref={bookFormRef}
        type="create"
        onSubmit={handleSubmit}
        validationSchema={CreateBookSchema}
      />
    </div>
  );
}
