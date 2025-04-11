import { httpClient } from './httpClient';

import { IBook, IBookAPIResponse } from '../../@types/Book';
import AuthorsMapper from './mappers/AuthorsMapper';

type UpdateBookProps = Omit<Partial<IBook>, 'id' | 'authors' | 'imagePath'> &
  Pick<IBook, 'id' | 'authors'> & { image?: File | null };

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
    const { data } = await httpClient.get<IBookAPIResponse>(`/books/${id}`);

    const domainAuthors = AuthorsMapper.toDomain({
      authors: data.authors,
      onlyCommas,
    });

    return { ...data, authors: domainAuthors };
  }

  async listBooks() {
    const { data } = await httpClient.get<IBookAPIResponse[]>('/books');

    return data;
  }

  async updateBook({ id, ...data }: UpdateBookProps): Promise<IBook> {
    const { data: updatedBook } = await httpClient.put<IBookAPIResponse>(
      `/books/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const domainAuthors = AuthorsMapper.toDomain({
      authors: updatedBook.authors,
      onlyCommas: true,
    });

    return { ...updatedBook, authors: domainAuthors };
  }

  async updateImage({ id, image }: UpdateBookCoverProps) {
    const form = new FormData();

    if (image) {
      form.append('image', image);
    } else {
      form.append('removeImage', 'true');
    }

    const { data: updatedBook } = await httpClient.put<IBookAPIResponse>(
      `/books/${id}`,
      form
    );

    return updatedBook;
  }

  async delete(id: string) {
    await httpClient.delete(`/books/${id}`);
  }
}

export default new BooksService();
