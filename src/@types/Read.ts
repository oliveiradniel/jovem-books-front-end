export type TReadingStatus = 'READING' | 'ON_HOLD' | 'FINISHED';

export interface IRead {
  createdAt: string;
  bookId: string;
  currentPage: number;
  status: TReadingStatus;
  notes: string | null;
  finishedAt: string | null;
}
