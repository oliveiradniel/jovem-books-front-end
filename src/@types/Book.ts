import { z } from 'zod';

import {
  CreateDataBookSchema,
  UpdateDataBookSchema,
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

export type TCreateDataBook = z.infer<typeof CreateDataBookSchema>;

export type TUpdateBookData = z.infer<typeof UpdateDataBookSchema>;

export type LiteraryGenreKey = keyof typeof LITERARY_GENRE_LABELS;
