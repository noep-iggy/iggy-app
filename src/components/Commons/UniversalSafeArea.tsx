import { useAppTheme } from '@/app/_layout';
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
  asView?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const UniversalSafeArea = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  ...props
}: props) => {
  const theme = useAppTheme();
  return (
    <SafeAreaView
      style={[
        { backgroundColor: theme.colors?.background },
        props.style,
        style.safeArea,
      ]}
      edges={props.asView ? ['right', 'left'] : edges}
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
