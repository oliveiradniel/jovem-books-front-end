import { httpClient } from './httpClient';

class BooksService {
  async listBooks() {
    const { data } = await httpClient.get('/books');

    return data;
  }
}

export default new BooksService();
