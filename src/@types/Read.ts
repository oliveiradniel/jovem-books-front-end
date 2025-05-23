import { ReadingStatus } from './Book';

export interface IRead {
  createdAt: string;
  bookId: string;
  currentPage: number;
  status: ReadingStatus;
  notes: string | null;
  finishedAt: string | null;
}
