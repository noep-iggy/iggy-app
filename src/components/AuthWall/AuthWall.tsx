import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/contexts';
import { useNavigation } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import { clearHistoryAndRedirect } from '@/utils';

interface AuthWallProps {
  children?: ReactNode;
}

export function AuthWall(props: AuthWallProps): React.JSX.Element {
  const { children } = props;
  const navigation = useNavigation();

  const { isAuthenticated, removeToken, token } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated()) {
      removeToken();
      clearHistoryAndRedirect('index', navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <ActivityIndicator animating={true} color="white" />
  );
}
