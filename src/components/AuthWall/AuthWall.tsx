import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/contexts';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/router/routes';
import { ActivityIndicator } from 'react-native';

interface AuthWallProps {
  children?: ReactNode;
}

export function AuthWall(props: AuthWallProps): React.JSX.Element {
  const { children } = props;
  const router = useRouter();

  const { isAuthenticated, removeToken, token } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated()) {
      removeToken();
      router.push(ROUTES.auth.index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <ActivityIndicator animating={true} color="white" />
  );
}
