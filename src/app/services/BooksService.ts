import { httpClient } from './httpClient';

import { IBook } from '../../@types/Book';

type UpdateReadProps = Omit<Partial<IBook>, 'id'> & Pick<IBook, 'id'>;

class BooksService {
  async getBookById(id: string) {
    const { data } = await httpClient.get<IBook>(`/books/${id}`);

    return data;
  }

  async listBooks() {
    const { data } = await httpClient.get<IBook[]>('/books');

    return data;
  }

  async updateBook({ id, ...data }: UpdateReadProps) {
    const { data: updatedBook } = await httpClient.put<IBook>(`/books/${id}`, {
      ...data,
    });

    return updatedBook;
  }
}

export default new BooksService();
