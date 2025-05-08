import { httpClient } from './utils/httpClient';

import { IGoogleBookAPI } from '../../@types/Book';

export type TGoogleBookSearchParams = { title: string } | { author: string };

class GoogleBooksService {
  async searchGoogleBooks(params: TGoogleBookSearchParams) {
    if ('title' in params) {
      return this.getGoogleBookByTitle(params.title);
    } else {
      return this.getGoogleBookByAuthor(params.author);
    }
  }

  private async getGoogleBookByTitle(title: string) {
    const { data: book } = await httpClient.get<IGoogleBookAPI[]>(
      `/google-books/title`,
      {
        params: { title },
      }
    );

    return book;
  }

  private async getGoogleBookByAuthor(author: string) {
    const { data: book } = await httpClient.get<IGoogleBookAPI[]>(
      `/google-books/author`,
      {
        params: { author },
      }
    );

    return book;
  }
}

export default new GoogleBooksService();
