interface FormatAuthorsProps {
  authors: string[];
  onlyCommas?: boolean;
}

export function formatAuthors({
  authors,
  onlyCommas = true,
}: FormatAuthorsProps) {
  if (authors.length === 0 || !authors) return '';

  authors = authors.map((author) => author.trim().replace(/\s+/g, ' '));

  if (authors.length === 1) {
    return authors[0];
  }

  const allButLast = authors.slice(0, authors.length - 1).join(', ');
  const last = authors[authors.length - 1];

  return onlyCommas ? `${allButLast}, ${last}` : `${allButLast} e ${last}`;
}
