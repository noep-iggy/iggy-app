import { Slot } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function LayoutHome() {
  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
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
