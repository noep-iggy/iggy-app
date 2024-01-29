import { AuthProvider } from '@/contexts';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { IggyDarkTheme, IggyLightTheme } from '../constants';
import CustomAppBar from '@/components/Commons/CustomAppBar';
import Toast from 'react-native-toast-message';
import { ROUTES } from '@/router/routes';
import CustomModalBar from '@/components/Commons/CustomModalBar';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const Layout = () => {
  const colorScheme = useColorScheme();
  const defaultTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const insets = useSafeAreaInsets();

  const theme = {
    ...defaultTheme,
    colors:
      colorScheme === 'dark' ? IggyDarkTheme.colors : IggyLightTheme.colors,
  };
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <ActionSheetProvider>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                header: (props) => <CustomAppBar {...props} />,
              }}
            >
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="index"
              />
              <Stack.Screen
                name={ROUTES.animal.create}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.animal.detail}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.task.create}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.task.parentDetail}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.task.childDetail}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.modals.refuseTaskModal}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.task.update}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.animal.update}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.settings.profile}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.settings.family}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.settings.house}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.user.update}
                options={{
                  presentation: 'modal',
                  header: (props) => <CustomModalBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.user.detail}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
              <Stack.Screen
                name={ROUTES.house.update}
                options={{
                  presentation: 'card',
                  header: (props) => <CustomAppBar {...props} />,
                }}
              />
            </Stack>
            <Toast topOffset={insets.top} />
          </SafeAreaProvider>
        </ActionSheetProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default Layout;
