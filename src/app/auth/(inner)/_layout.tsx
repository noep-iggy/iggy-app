import { Slot } from 'expo-router';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function LayoutHome() {
  const theme = useTheme();
  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Slot />
    </ScrollView>
  );
}
