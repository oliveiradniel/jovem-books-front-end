import { httpClient } from './utils/httpClient';

import { IBookAPI, TCreateBook, TUpdateBook } from '../../@types/Book';

interface UpdateBookCoverProps {
  id: string;
  image: File | null;
}

interface GetBookByIdProps {
  id: string;
  onlyCommas?: boolean;
}

class BooksService {
  async getBookById({ id }: GetBookByIdProps): Promise<IBookAPI> {
    const { data } = await httpClient.get<IBookAPI>(`/books/${id}`);

    return data;
  }

  async listBooks() {
    const { data } = await httpClient.get<IBookAPI[]>('/books');

    return data;
  }

  async createBook(book: TCreateBook): Promise<IBookAPI> {
    const { data: createdBook } = await httpClient.post<IBookAPI>(
      '/books',
      book
    );

    return createdBook;
  }

  async updateBook({ id, ...book }: TUpdateBook): Promise<IBookAPI> {
    const { data: updatedBook } = await httpClient.put<IBookAPI>(
      `/books/${id}`,
      book,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return updatedBook;
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
