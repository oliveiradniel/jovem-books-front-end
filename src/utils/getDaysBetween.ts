interface GetDaysBetweenProps {
  startDate: Date | string;
  endDate: Date | string;
}

export function getDaysBetween({ startDate, endDate }: GetDaysBetweenProps) {
  const sd = new Date(startDate);
  const ed = new Date(endDate);

  if (isNaN(sd.getTime()) || isNaN(ed.getTime())) {
    return null;
  }

  if (sd.getFullYear() > ed.getFullYear()) {
    return null;
  }

  const normalizedSD = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate());
  const normalizedED = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());

  const diffInMs = normalizedED.getTime() - normalizedSD.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
