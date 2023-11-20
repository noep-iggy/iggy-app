import React from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function UniversalSafeArea(props: props) {
  return (
    <SafeAreaView style={[props.style, style.androidSafeArea]}>
      {props.children}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
