export interface Book {
  id: number;
  title: string;
  author: string;
  sinopse: string;
  imagePath: string;
  genreLiterary: LiteraryGenre;
  numberOfPages: number;
  currentPage: number | null;
  status: ReadingStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

export type ReadingStatus = 'NOT_READING' | 'READING' | 'ON_HOLD' | 'FINISHED';

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
