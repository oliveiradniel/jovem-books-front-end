import { IBookAPI } from '../../@types/Book';
import { httpClient } from './httpClient';

class BooksService {
  async listBooks() {
    const { data } = await httpClient.get<IBookAPI[]>('/books');

    return data;
  }
}

export default new BooksService();
