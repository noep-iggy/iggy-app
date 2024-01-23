import { MediaDto } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fileUpload(uri: string): Promise<MediaDto | undefined> {
  try {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? '';
    const token = (await AsyncStorage.getItem('token')) ?? '';
    const apiKey = process.env.EXPO_PUBLIC_API_KEY ?? '';

    const upload = await FileSystem.uploadAsync(
      baseUrl + API_ROUTES.media.upload,
      uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
        },
      }
    );

    const image: MediaDto = JSON.parse(upload.body);

    return image;
  } catch (error) {
    console.log('[E] mediaService', error);
  }
}

export const MediaApiService = {
  fileUpload,
};
