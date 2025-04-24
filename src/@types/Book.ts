import { z } from 'zod';

import {
  CreateDataBookSchema,
  UpdateDataBookSchema,
} from '../assets/schemas/BookSchemas';

type BaseBook = {
  id: string;
  title: string;
  authors: string;
  sinopse: string | null;
  imagePath: string | null;
  numberOfPages: number;
  literaryGenre: TLiteraryGenre[];
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

export interface IBookAPI extends Omit<BaseBook, 'authors'> {
  authors: string[];
}

export type ReadingStatus = 'READING' | 'ON_HOLD' | 'FINISHED';

export type TLiteraryGenre =
  | 'ROMANCE'
  | 'SCIENCE_FICTION'
  | 'ADVENTURE'
  | 'PHILOSOPHY'
  | 'DRAMA'
  | 'RELIGIOUS'
  | 'MYSTERY'
  | 'HORROR'
  | 'BIOGRAPHY'
  | 'HISTORICAL'
  | 'FANTASY'
  | 'THRILLER'
  | 'HUMOR'
  | 'CHILDRENS'
  | 'YOUNG_ADULT'
  | 'POETRY'
  | 'ART_AND_DESIGN'
  | 'POLITICS'
  | 'ECONOMICS'
  | 'SELF_HELP'
  | 'CRIME'
  | 'DYSTOPIAN'
  | 'WESTERN'
  | 'GOTHIC'
  | 'EROTIC'
  | 'CYBERPUNK'
  | 'STEAMPUNK'
  | 'COOKING'
  | 'TRAVEL'
  | 'SPORTS'
  | 'FAIRYTALE'
  | 'OTHER';

export type TCreateDataBook = z.infer<typeof CreateDataBookSchema>;

export type TUpdateBookData = z.infer<typeof UpdateDataBookSchema>;
