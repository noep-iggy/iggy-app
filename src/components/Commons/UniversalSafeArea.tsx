import React from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

interface props extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function UniversalSafeArea({
  children,
  edges = ['bottom', 'left', 'right'],
  ...props
}: props) {
  return (
    <SafeAreaView style={[props.style, style.safeArea]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
