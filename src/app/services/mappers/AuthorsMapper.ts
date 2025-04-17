import { formatAuthors } from '../../../utils/formatAuthors';

interface ToDomainProps {
  authors: string[];
  onlyCommas?: boolean;
}

interface ToPersistenceProps {
  authors: string;
}

class AuthorsMapper {
  toDomain({ authors, onlyCommas = true }: ToDomainProps): string {
    const formattedAuthors = formatAuthors({ authors: authors, onlyCommas });

    return formattedAuthors;
  }

  toPersistence({ authors }: ToPersistenceProps): string[] {
    const formattedAuthors = authors
      .split(',')
      .map((author) => author.trim())
      .filter((author) => author !== '');

    return formattedAuthors;
  }
}

export default new AuthorsMapper();
