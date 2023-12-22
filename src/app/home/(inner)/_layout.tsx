import { Slot } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function LayoutHome() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Slot />
    </KeyboardAvoidingView>
  );
}
