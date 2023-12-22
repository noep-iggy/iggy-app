import { Slot } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';

export default function LayoutHome() {
  const colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
