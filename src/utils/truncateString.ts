export function truncateString(str: string, maxLength: number) {
  {
    if (!str) return '';

    const truncate = str.slice(0, maxLength);
    return str.length > maxLength ? `${truncate}...` : truncate;
  }
}
