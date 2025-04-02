import { httpClient } from './httpClient';

import { IBook } from '../../@types/Book';

class BooksService {
  async getBookById(id: string) {
    const { data } = await httpClient.get<IBook>(`/books/${id}`);

    return data;
  }

  async listBooks() {
    const { data } = await httpClient.get<IBook[]>('/books');

    return data;
  }
}

export default new BooksService();
