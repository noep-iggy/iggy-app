import { useAppTheme } from '@/app/_layout';
import { ROUTES } from '@/router/routes';
import { router } from 'expo-router';
import { TouchableOpacityProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';

interface AddPetCardProps {
  style?: TouchableOpacityProps['style'];
}
const AddPetCard = (props: AddPetCardProps) => {
  const { style } = props;
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        {
          borderColor: theme.colors.secondary,
          borderRadius: 8,
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
