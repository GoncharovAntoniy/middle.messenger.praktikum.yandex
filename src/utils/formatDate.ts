function isToday(date: Date): boolean {
  const today = new Date();
  return date.toLocaleDateString() === today.toLocaleDateString();
}

export const formatDate = (date: string) => {
  const fromatDate = new Date(date).getDay();
  const today = isToday(new Date(date));
  if (today) {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()}`;
  }
  switch (fromatDate) {
    case 0:
      return 'Вс';
    case 1:
      return 'Пн';
    case 2:
      return 'Вт';
    case 3:
      return 'Ср';
    case 4:
      return 'Че';
    case 5:
      return 'Пт';
    case 6:
      return 'Сб';

    default:
      return '';
  }
};
