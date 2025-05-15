import { z } from 'zod';

import {
  CreateBookSchema,
  UpdateBookSchema,
} from '../assets/schemas/BookSchemas';

import { LITERARY_GENRE_LABELS } from '../constants/books';

type BaseBook = {
  id: string;
  title: string;
  authors: string;
  sinopse: string | null;
  imagePath: string | null;
  numberOfPages: number;
  literaryGenre: string[];
  read: {
    status: ReadingStatus;
    currentPage: number;
    createdAt: string;
    finishedAt: string | null;
  } | null;
};

export interface IBook extends BaseBook {
  authors: string;
}

export type IGoogleBookAPI = Omit<BaseBook, 'authors' | 'read'> & {
  authors: string[];
};

export interface IGoogleBooksAPI {
  data: IGoogleBookAPI[];
}

export interface IBookAPI extends Omit<BaseBook, 'authors'> {
  authors: string[];
}

export type ReadingStatus = 'READING' | 'ON_HOLD' | 'FINISHED';

export type TBookFilter = 'ALL' | 'NOT_READING' | 'READING' | 'FINISHED';

export type TCreateBook = z.infer<typeof CreateBookSchema>;

export type TUpdateBook = z.infer<typeof UpdateBookSchema>;

export type LiteraryGenreKey = keyof typeof LITERARY_GENRE_LABELS;
