import { httpClient } from './utils/httpClient';

import { IGoogleBooksAPI } from '../../@types/Book';

export type TGoogleBookSearchParams =
  | { page: number; title: string }
  | { page: number; author: string };

class GoogleBooksService {
  async searchGoogleBooks(params: TGoogleBookSearchParams) {
    if ('title' in params) {
      return this.getGoogleBookByTitle(params.page, params.title);
    } else {
      return this.getGoogleBookByAuthor(params.page, params.author);
    }
  }

  private async getGoogleBookByTitle(page: number, title: string) {
    const startIndex = page * 20;

    const { data: book } = await httpClient.get<IGoogleBooksAPI>(
      `/google-books/title?startIndex=${startIndex}`,
      {
        params: { title },
      }
    );

    return book;
  }

  private async getGoogleBookByAuthor(page: number, author: string) {
    const startIndex = page * 20;

    const { data: book } = await httpClient.get<IGoogleBooksAPI>(
      `/google-books/author?startIndex=${startIndex}`,
      {
        params: { author },
      }
    );

    return book;
  }
}

export default new GoogleBooksService();
