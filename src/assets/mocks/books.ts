import { Book } from '../../@types/Book';

export const books: Book[] = [
  {
    id: Math.random(),
    title: 'Harry Potter',
    author: 'J. K. Rowling',
    genreLiterary: 'DRAMA',
    status: 'NOT_READING',
  },
  {
    id: Math.random(),
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genreLiterary: 'ADVENTURE',
    status: 'READING',
  },
  {
    id: Math.random(),
    title: '1984',
    author: 'George Orwell',
    genreLiterary: 'DYSTOPIAN',
    status: 'NOT_READING',
  },
  {
    id: Math.random(),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genreLiterary: 'DRAMA',
    status: 'READING',
  },
  {
    id: Math.random(),
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genreLiterary: 'DRAMA',
    status: 'NOT_READING',
  },
  {
    id: Math.random(),
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genreLiterary: 'DRAMA',
    status: 'FINISHED',
  },
  {
    id: Math.random(),
    title: 'Moby-Dick',
    author: 'Herman Melville',
    genreLiterary: 'ADVENTURE',
    status: 'FINISHED',
  },
  {
    id: Math.random(),
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genreLiterary: 'ROMANCE',
    status: 'ON_HOLD',
  },
  {
    id: Math.random(),
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genreLiterary: 'ADVENTURE',
    status: 'NOT_READING',
  },
  {
    id: Math.random(),
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genreLiterary: 'DYSTOPIAN',
    status: 'READING',
  },
];
