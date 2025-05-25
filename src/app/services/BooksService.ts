import { httpClient } from './utils/httpClient';

import { IBookAPI, TCreateBook, TUpdateBook } from '../../@types/Book';
import { IPreSignedURL, TGetPreSignedURL } from '../../@types/S3';

interface UpdateBookCoverProps {
  id: string;
  imagePath: string | null;
  removeImage: boolean;
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
    console.log(createdBook);
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

  async updateImage({ id, imagePath, removeImage }: UpdateBookCoverProps) {
    const form = new FormData();
    form.append('removeImage', JSON.stringify(removeImage));

    if (imagePath) {
      form.append('imagePath', imagePath);
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

  async getPreSignedURL({ mimeType, fileSize }: TGetPreSignedURL) {
    const { data } = await httpClient.get<IPreSignedURL>(
      `/books/upload-cover?type=${mimeType}&size=${fileSize}`
    );

    return {
      url: data.url,
      key: data.key,
    };
  }
}

export default new BooksService();
