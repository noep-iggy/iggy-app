export function transformPathToKey(path: string): string {
  return path.replace(/^\//, '').replace(/\//g, '_');
}
