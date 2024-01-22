import { ROUTES } from '@/router/routes';
import { router } from 'expo-router';
import { TouchableOpacityProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, useTheme } from 'react-native-paper';

interface AddPetCardProps {
  style?: TouchableOpacityProps['style'];
}
const AddPetCard = (props: AddPetCardProps) => {
  const { style } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          height: 180,
          borderColor: theme.colors.secondary,
          borderWidth: 1,
          borderRadius: 8,
          padding: 16,
          borderStyle: 'dashed',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={() => {
        router.push(ROUTES.animal.create);
      }}
    >
      <View
        style={{
          width: 75,
          height: 75,
          borderRadius: 75,
          backgroundColor: theme.colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon source="plus" size={24} color={theme.colors.onSurfaceVariant} />
      </View>
    </TouchableOpacity>
  );
};

export default AddPetCard;
