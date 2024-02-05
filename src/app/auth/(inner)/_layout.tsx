import { Slot } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function LayoutHome() {
  const theme = useTheme();
  return <Slot />;
}
