import { ROUTES } from '@/router/routes';
import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';
import { Image } from 'react-native';
import { useAppTheme } from '@/app/_layout';

const ParentLayout = () => {
  const theme = useAppTheme();
  const background = require('@/assets/images/app/splash.png');

  const commons = {
    headerBackground: () => (
      <Image source={background} style={{ width: '100%', height: '100%' }} />
    ),
    headerTitleStyle: {
      color: 'white',
    },
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerTintColor: theme.colors.onBackground,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="parent"
        options={{
          tabBarLabel: 'Accueil',
          headerTitle: 'Bienvenue',

          tabBarIcon: ({ color, size }) => (
            <Icon source="home" size={size} color={color} />
          ),
          ...commons,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tâches',
          tabBarIcon: ({ color, size }) => (
            <Icon
              source="checkbox-marked-circle-outline"
              size={size}
              color={color}
            />
          ),
          ...commons,
        }}
      />
      <Tabs.Screen
        name="animals"
        options={{
          title: 'Animaux',
          tabBarIcon: ({ color, size }) => (
            <Icon source="paw" size={size} color={color} />
          ),
          href: {
            pathname: ROUTES.animal.list,
          },
          ...commons,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Boutique',
          tabBarIcon: ({ color, size }) => (
            <Icon source="cart" size={size} color={color} />
          ),
          ...commons,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color, size }) => (
            <Icon source="account-cog" size={size} color={color} />
          ),
          ...commons,
        }}
      />
    </Tabs>
  );
};

export default ParentLayout;
