export function transformPathToKey(path: string): string {
  return path.replace(/^\//, '').replace(/\//g, '_');
}

export function formatTime(date: Date): string {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}h${minutes}`;
}

export function formatDate(date: Date): string {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  const today = new Date();
  const yesterday = new Date().setDate(today.getDate() - 1);
  const tomorrow = new Date().setDate(today.getDate() + 1);

  if (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth()
  ) {
    return "Aujourd'hui";
  }
  if (
    dateObj.getDate() === new Date(yesterday).getDate() &&
    dateObj.getMonth() === new Date(yesterday).getMonth()
  ) {
    return 'Hier';
  }
  if (
    dateObj.getDate() === new Date(tomorrow).getDate() &&
    dateObj.getMonth() === new Date(tomorrow).getMonth()
  ) {
    return 'Demain';
  }
  return `${day}/${month}/${year}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} à ${formatTime(date)}`;
}
