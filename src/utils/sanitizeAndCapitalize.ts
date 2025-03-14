export function sanitizeAndCapitalize(value: string) {
  const valueWithoutNumbers = value.replace(/[^A-Za-z]/g, '');

  const capitalizedFirstLetter =
    valueWithoutNumbers.charAt(0).toUpperCase() + value.slice(1);

  return capitalizedFirstLetter;
}
