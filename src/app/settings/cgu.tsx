import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useTheme } from 'react-native-paper';
import WebView from 'react-native-webview';

const CguSettings = () => {
  const theme = useTheme();
  const cgu = require('@/assets/cgu-iggy.html');

  return (
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
  );
};

export default CguSettings;
