import { IRead } from '../../@types/Read';

import { TReadingStatus } from '../../@types/Read';

import { httpClient } from './utils/httpClient';

interface GetReadByBookIProps {
  bookId: string;
}

interface CreateReadProps {
  bookId: string;
}

interface UpdateReadProps {
  bookId: string;
  currentPage?: number;
  status?: TReadingStatus;
  note?: string;
  finishedAt?: Date;
}

class ReadsService {
  async getReadByBookId({ bookId }: GetReadByBookIProps) {
    const { data: read } = await httpClient.get<IRead>(`/reads/${bookId}`);

    return read;
  }

  async createRead({ bookId }: CreateReadProps) {
    const { data: updatedRead } = await httpClient.post<IRead>(
      `/reads/${bookId}`
    );

    return updatedRead;
  }

  async updateRead({ bookId, ...data }: UpdateReadProps) {
    const { data: updatedRead } = await httpClient.put<IRead>(
      `/reads/${bookId}`,
      {
        ...data,
      }
    );

    return updatedRead;
  }
}

export default new ReadsService();
