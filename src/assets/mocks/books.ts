import george from './1984.jpg';
import braveNewWord from './brave-new-word.jpg';
import mobyDick from './moby-dick.jpg';
import prideAndPrejudice from './pride-and-prejudice.jpg';
import theCatcherInTheRye from './the-catcher-in-the-rye.jpg';
import theGreatGatsby from './the-great-gatsby.jpg';
import theHobbit from './the-hobbit.jpg';
import theLordOfTheRings from './the-lord-of-the-rings.jpg';
import toKillAMockinbird from './to-kill-a-mockinbird.jpg';

import { IBook } from '../../@types/Book';
import { formatDate } from '../../utils/formatDate';

export const books: IBook[] = [
  {
    id: String(Math.random()),
    title: 'Harry Potter',
    authors: ['J. K. Rowling', 'George Orwell', 'George Orwell'],
    sinopse:
      'Harry Potter é um garoto órfão que vive com seus tios e primo, a quem é tratado de forma cruel e negligente. No entanto, ao completar 11 anos, Harry descobre que é, na verdade, um bruxo e recebe uma carta de admissão para estudar na Escola de Magia e Bruxaria de Hogwarts. Lá, ele conhece novos amigos, como Ron Weasley e Hermione Granger, e descobre que é famoso no mundo bruxo por ter sobrevivido a um ataque do bruxo das trevas Lord Voldemort, que matou seus pais quando Harry ainda era um bebê.',
    imagePath: null,
    genreLiterary: ['DRAMA', 'ADVENTURE'],
    numberOfPages: 302,
    read: null,
  },
  {
    id: String(Math.random()),
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    sinopse:
      'O Hobbit segue as aventuras de Bilbo Baggins, um hobbit tranquilo que vive uma vida pacata na Comarca, até o dia em que é inesperadamente recrutado pelo mago Gandalf e um grupo de anões liderados por Thorin Oakenshield. Juntos, eles partem em uma jornada para recuperar o Reino de Erebor, tomado por um dragão chamado Smaug. Ao longo de sua jornada, Bilbo enfrenta trolls, orcs, elfos e encontra um anel mágico que mais tarde se revela de grande importância.',
    imagePath: theHobbit,
    genreLiterary: ['ADVENTURE', 'BIOGRAPHY'],
    numberOfPages: 490,
    read: {
      currentPage: 1,
      status: 'READING',
      createdAt: formatDate(new Date()),
      finishedAt: null,
    },
  },
  {
    id: String(Math.random()),
    title: '1984',
    authors: ['George Orwell', 'George Orwell'],
    sinopse:
      'Em um futuro distópico, o governo de Oceânia é liderado pelo Grande Irmão, uma figura onipresente que monitora todos os aspectos da vida dos cidadãos. Winston Smith, um funcionário do governo, começa a questionar o regime totalitário e a verdade imposta pelo Partido, levando-o a um caminho de rebelião. O livro é uma reflexão profunda sobre os perigos do totalitarismo, da vigilância e da manipulação da realidade.',
    imagePath: george,
    genreLiterary: ['DYSTOPIAN'],
    numberOfPages: 309,
    read: null,
  },
  {
    id: String(Math.random()),
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    sinopse: null,
    imagePath: toKillAMockinbird,
    genreLiterary: ['DRAMA'],
    numberOfPages: 224,
    read: {
      currentPage: 1,
      status: 'READING',
      createdAt: formatDate(new Date()),
      finishedAt: null,
    },
  },
  {
    id: String(Math.random()),
    title: 'The Catcher in the Rye',
    authors: ['J.D. Salinger'],
    sinopse:
      'O livro segue Holden Caulfield, um adolescente problemático e rebelde, enquanto ele narra sua vida em Nova York após ser expulso da escola preparatória. O romance aborda temas como alienação, a busca por identidade e o desejo de proteção contra os males do mundo adulto, sendo considerado um clássico da literatura americana.',
    imagePath: theCatcherInTheRye,
    genreLiterary: ['DRAMA'],
    numberOfPages: 404,
    read: null,
  },
  {
    id: String(Math.random()),
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald', 'F. Scott Fitzgerald'],
    sinopse:
      'A história se passa na década de 1920 e segue o misterioso Jay Gatsby, um milionário que organiza festas luxuosas em sua mansão, na esperança de reencontrar seu amor perdido, Daisy Buchanan. Através dos olhos de Nick Carraway, o romance explora os excessos, a decadência e a busca insaciável pelo sonho americano.',
    imagePath: theGreatGatsby,
    genreLiterary: ['DRAMA'],
    numberOfPages: 298,
    read: {
      currentPage: 298,
      status: 'FINISHED',
      createdAt: formatDate(new Date()),
      finishedAt: formatDate(new Date()),
    },
  },
  {
    id: String(Math.random()),
    title: 'Moby-Dick',
    authors: ['Herman Melville'],
    sinopse:
      'O romance conta a história da obsessiva busca de Capitão Ahab pela baleia branca Moby-Dick, que arrancou sua perna. Narrado por Ishmael, um marinheiro, o livro explora temas como vingança, a luta entre o homem e a natureza, e a obsessão humana.',
    imagePath: mobyDick,
    genreLiterary: ['ADVENTURE'],
    numberOfPages: 504,
    read: {
      currentPage: 504,
      status: 'FINISHED',
      createdAt: formatDate(new Date()),
      finishedAt: formatDate(new Date()),
    },
  },
  {
    id: String(Math.random()),
    title: 'Pride and Prejudice',
    authors: ['Jane Austen'],
    sinopse:
      'O romance segue a história de Elizabeth Bennet, uma jovem inteligente e independente, e sua relação com o orgulhoso, mas apaixonado, Mr. Darcy. Ambientado na sociedade inglesa do século XIX, o livro aborda temas de classe social, casamento e o papel da mulher na sociedade.',
    imagePath: prideAndPrejudice,
    genreLiterary: ['ROMANCE'],
    numberOfPages: 302,
    read: {
      currentPage: 104,
      status: 'ON_HOLD',
      createdAt: formatDate(new Date()),
      finishedAt: null,
    },
  },
  {
    id: String(Math.random()),
    title: 'The Lord of the Rings',
    authors: ['J.R.R. Tolkien'],
    sinopse:
      'A trilogia segue o hobbit Frodo Baggins enquanto ele é encarregado de destruir o Um Anel, um artefato mágico que confere poder absoluto, para impedir que o Senhor das Trevas, Sauron, tome o controle da Terra Média. Ao longo da jornada, Frodo é acompanhado por um grupo diverso de heróis, enfrentando inúmeros desafios.',
    imagePath: theLordOfTheRings,
    genreLiterary: ['ADVENTURE'],
    numberOfPages: 704,
    read: null,
  },
  {
    id: String(Math.random()),
    title: 'Brave New World',
    authors: ['Aldous Huxley'],
    sinopse:
      'Em um futuro distópico, a humanidade vive sob uma sociedade controlada, onde as pessoas são condicionadas desde o nascimento a aceitar seu papel e a sociedade vive sem conflitos. O livro segue Bernard Marx e Lenina Crowne, que começam a questionar o sistema após uma viagem ao "mundo selvagem".',
    imagePath: braveNewWord,
    genreLiterary: ['DYSTOPIAN'],
    numberOfPages: 287,
    read: {
      currentPage: 1,
      status: 'READING',
      createdAt: formatDate(new Date()),
      finishedAt: null,
    },
  },
];
