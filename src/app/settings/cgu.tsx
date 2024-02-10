import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import WebView from 'react-native-webview';
import { useAppTheme } from '../_layout';
import { StatusBar } from 'expo-status-bar';

const CguSettings = () => {
  const theme = useAppTheme();
  const cgu = require('@/assets/cgu-iggy.html');

  return (
    <>
      <StatusBar style="auto" />
      <UniversalSafeArea style={{}} asView>
        <WebView
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: 16,
          }}
          source={cgu}
        />
      </UniversalSafeArea>
    </>
  );
};

export default CguSettings;
