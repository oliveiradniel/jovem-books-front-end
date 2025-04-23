import { httpClient } from './utils/httpClient';

import { IBookAPI } from '../../@types/Book';

interface GetGoogleBookByTitleProps {
  title: string;
}

interface GetGoogleBookByAuthorProps {
  author: string;
}

class GoogleBooksService {
  async getGoogleBookByTitle(data: GetGoogleBookByTitleProps) {
    const { data: book } = await httpClient.get<IBookAPI[]>(
      `/google-books/title`,
      {
        params: data,
      }
    );

    return book;
  }

  async getGoogleBookByAuthor(data: GetGoogleBookByAuthorProps) {
    const { data: book } = await httpClient.get<IBookAPI[]>(
      '/google-books/author',
      {
        params: data,
      }
    );

    return book;
  }
}

export default new GoogleBooksService();
