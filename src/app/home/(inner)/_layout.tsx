import { Slot } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function LayoutHome() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
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
