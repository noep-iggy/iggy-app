import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LightTheme,
  PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IggyDarkTheme, IggyLightTheme } from '../constants';

export default function Layout() {
  const colorScheme = useColorScheme();
  const defaultTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  const theme = {
    ...defaultTheme,
    colors:
      colorScheme === 'dark' ? IggyDarkTheme.colors : IggyLightTheme.colors,
  };
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
