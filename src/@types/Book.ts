export interface IBook {
  id: string;
  title: string;
  authors: string;
  sinopse: string | null;
  imagePath: string | null;
  numberOfPages: number;
  genreLiterary: LiteraryGenre[];
  read: {
    status: ReadingStatus;
    currentPage: number;
    createdAt: string | Date;
    finishedAt: string | Date | null;
  } | null;
}

export interface IBookAPIResponse {
  id: string;
  title: string;
  authors: string[];
  sinopse: string | null;
  imagePath: string | null;
  numberOfPages: number;
  genreLiterary: LiteraryGenre[];
  read: {
    status: ReadingStatus;
    currentPage: number;
    createdAt: string | Date;
    finishedAt: string | Date | null;
  } | null;
}

export type ReadingStatus = 'READING' | 'ON_HOLD' | 'FINISHED';

export type LiteraryGenre =
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
