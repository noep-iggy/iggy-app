import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { componentsStyles, genericStyles, platformStyles } from '../constants';
import i18n from '../locales/localization';

export default function SignIn() {
  return (
    <SafeAreaView style={[styles.container, platformStyles.androidSafeArea]}>
      <Text>{i18n.t('Welcome')}</Text>
      <Pressable style={componentsStyles.secondaryButton}>
        <Text>Sign in</Text>
      </Pressable>
      <Pressable style={componentsStyles.tertiaryButton}>
        <Text>Sign in</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...genericStyles.container,
    height: '100%',
  },
});
