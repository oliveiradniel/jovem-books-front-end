import { Read } from '../../@types/Read';

import { ReadingStatus } from '../../@types/Book';

import { httpClient } from './httpClient';

interface CreateReadProps {
  bookId: string;
  currentPage: number;
  status: ReadingStatus;
  note?: string;
  finishedAt?: Date;
}

class ReadsService {
  async createRead({ bookId, ...data }: CreateReadProps) {
    const { data: read } = await httpClient.post<Read>(`/reads/${bookId}`, {
      ...data,
    });

    return read;
  }
}

export default new ReadsService();
