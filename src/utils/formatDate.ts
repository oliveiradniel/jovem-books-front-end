export function formatDate(date: Date) {
  let safeDate;

  if (typeof date === 'string') {
    safeDate = new Date(date);
  } else {
    safeDate = date;
  }

  return safeDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
