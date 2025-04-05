import { httpClient } from './httpClient';

import { IBook } from '../../@types/Book';

type UpdateBookProps = Omit<Partial<IBook>, 'id' | 'imagePath'> &
  Pick<IBook, 'id'> & { image?: File | null };

interface UpdateBookCoverProps {
  id: string;
  image: File | null;
}

class BooksService {
  async getBookById(id: string) {
    const { data } = await httpClient.get<IBook>(`/books/${id}`);

    return data;
  }

  async listBooks() {
    const { data } = await httpClient.get<IBook[]>('/books');

    return data;
  }

  async updateBook({ id, ...data }: UpdateBookProps) {
    const { data: updatedBook } = await httpClient.put<IBook>(
      `/books/${id}`,
      data,
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
    }

    const { data: updatedBook } = await httpClient.put<IBook>(
      `/books/${id}`,
      form
    );

    return updatedBook;
  }
}

export default new BooksService();
