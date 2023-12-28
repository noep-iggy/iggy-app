import React from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

interface props extends SafeAreaViewProps {
  theme: ThemeProp;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const UniversalSafeArea = ({
  children,
  edges = ['bottom', 'left', 'right'],
  ...props
}: props) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[
        { backgroundColor: theme.colors?.background },
        props.style,
        style.safeArea,
      ]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

export default UniversalSafeArea;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
