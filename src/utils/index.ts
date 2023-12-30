export function transformPathToKey(path: string): string {
  return path.replace(/^\//, '').replace(/\//g, '_');
}

export function formatTime(date: Date): string {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}h${minutes}`;
}
