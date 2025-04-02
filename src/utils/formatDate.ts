export function formatDate(date: Date) {
  const safeDate = new Date(date);

  return safeDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
