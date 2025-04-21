import { httpClient } from './utils/httpClient';

interface GetGoogleBookByTitleProps {
  title: string;
}

interface GetGoogleBookByAuthorProps {
  author: string;
}

class GoogleBooksService {
  async getGoogleBookByTitle(data: GetGoogleBookByTitleProps) {
    const { data: book } = await httpClient.get(`/google-books/title`, {
      params: data,
    });

    console.log(book);
  }

  async getGoogleBookByAuthor(data: GetGoogleBookByAuthorProps) {
    const { data: book } = await httpClient.get('/google-books/author', {
      params: data,
    });

    console.log(book);
  }
}

export default new GoogleBooksService();
