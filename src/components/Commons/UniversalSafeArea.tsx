import React from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
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
  theme,
  children,
  edges = ['bottom', 'left', 'right'],
  ...props
}: props) => {
  const { colors } = theme;
  return (
    <SafeAreaView
      style={[
        { backgroundColor: colors?.background },
        props.style,
        style.safeArea,
      ]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

export default withTheme(UniversalSafeArea);

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
