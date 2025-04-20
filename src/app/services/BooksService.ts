import { httpClient } from './utils/httpClient';

import AuthorsMapper from './mappers/AuthorsMapper';

import {
  IBook,
  IBookAPI,
  TCreateDataBook,
  TUpdateBookData,
} from '../../@types/Book';

interface UpdateBookCoverProps {
  id: string;
  image: File | null;
}

interface GetBookByIdProps {
  id: string;
  onlyCommas: boolean;
}

class BooksService {
  async getBookById({ id, onlyCommas }: GetBookByIdProps): Promise<IBook> {
    const { data } = await httpClient.get<IBookAPI>(`/books/${id}`);

    const domainAuthors = AuthorsMapper.toDomain({
      authors: data.authors,
      onlyCommas,
    });

    return { ...data, authors: domainAuthors };
  }

  async listBooks() {
    const { data } = await httpClient.get<IBookAPI[]>('/books');

    return data;
  }

  async createBook(book: TCreateDataBook) {
    await httpClient.post('/books', book);
  }

  async updateBook({ id, ...book }: TUpdateBookData): Promise<IBook> {
    const { data: updatedBook } = await httpClient.put<IBookAPI>(
      `/books/${id}`,
      book,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const domainAuthors = AuthorsMapper.toDomain({
      authors: updatedBook.authors,
    });

    return { ...updatedBook, authors: domainAuthors };
  }

  async updateImage({ id, image }: UpdateBookCoverProps) {
    const form = new FormData();
    if (image) {
      form.append('image', image);
    } else {
      form.append('removeImage', JSON.stringify(true));
    }

    const { data: updatedBook } = await httpClient.put<IBookAPI>(
      `/books/${id}`,
      form
    );

    return updatedBook;
  }

  async deleteBook(id: string) {
    await httpClient.delete(`/books/${id}`);
  }
}

export default new BooksService();
