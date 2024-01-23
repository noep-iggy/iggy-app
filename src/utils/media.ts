import axios from 'axios';

export async function createFileFromUrl(
  url: string,
  name: string
): Promise<File> {
  const response = await axios.get(url, {
    responseType: 'blob',
  });
  return new File([response.data], name);
}
