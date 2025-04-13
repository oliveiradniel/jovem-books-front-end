import { IRead } from '../../@types/Read';

import { ReadingStatus } from '../../@types/Book';

import { httpClient } from './utils/httpClient';

interface CreateReadProps {
  bookId: string;
  currentPage: number;
  status: ReadingStatus;
  note?: string;
  finishedAt?: Date;
}

type UpdateReadProps = Omit<Partial<CreateReadProps>, 'bookId'> &
  Pick<CreateReadProps, 'bookId'>;

class ReadsService {
  async createRead({ bookId, ...data }: CreateReadProps) {
    const { data: updatedRead } = await httpClient.post<IRead>(
      `/reads/${bookId}`,
      {
        ...data,
      }
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
