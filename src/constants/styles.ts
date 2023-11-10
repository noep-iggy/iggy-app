import { Platform, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const platformStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export const genericStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.primary,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
  },
});

export const componentsStyles = StyleSheet.create({
  secondaryButton: {
    ...genericStyles.button,
    backgroundColor: 'white',
  },
  tertiaryButton: {
    ...genericStyles.button,
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
  },
});
