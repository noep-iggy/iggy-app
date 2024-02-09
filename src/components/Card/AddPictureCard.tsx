import { TouchableOpacityProps, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '@/app/_layout';

interface AddPictureCardProps {
  style?: TouchableOpacityProps['style'];
  setPictureUri: (pictureUri?: string) => void;
  pictureUri?: string;
  size?: 'small' | 'large';
}

const AddPictureCard = (props: AddPictureCardProps) => {
  const { style, pictureUri, setPictureUri, size = 'large' } = props;
  const theme = useAppTheme();

  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      await setPictureUri(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={[
        {
          height: size === 'large' ? 350 : 50,
          width: '100%',
          borderColor: theme.colors.secondary,
          borderWidth: 1,
          borderRadius: 8,
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        },
        style,
      ]}
      onPress={() => selectImage(false)}
    >
      {pictureUri ? (
        <View style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            source={{ uri: pictureUri }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              padding: 10,
              borderRadius: 30,
              backgroundColor: theme.colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              source="camera"
              size={size === 'large' ? 24 : 18}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            width: size === 'large' ? 75 : 35,
            height: size === 'large' ? 75 : 35,
            borderRadius: 75,
            backgroundColor: theme.colors.surfaceVariant,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            source="camera"
            size={size === 'large' ? 40 : 18}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AddPictureCard;
