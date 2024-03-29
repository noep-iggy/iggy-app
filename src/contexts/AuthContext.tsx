import { ApiService, HttpService } from '@/api';
import { UserDto } from '@/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {
  currentUser: UserDto | null;
  token: string;
  isLoaded: boolean;
}

interface Context extends State {
  setToken: (token: string) => void;
  removeToken: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const defaultState: State = {
  currentUser: null,
  token: '',
  isLoaded: false,
};

const AuthContext = React.createContext<Context>({
  ...defaultState,
  setToken: () => {
    throw new Error('AuthContext.setToken has not been set');
  },
  removeToken: () => {
    throw new Error('AuthContext.removeToken has not been set');
  },
  refreshUser: () => {
    throw new Error('AuthContext.refreshUser has not been set');
  },
  isAuthenticated: () => {
    throw new Error('AuthContext.isAuthenticated has not been set');
  },
});

function useAuthProvider() {
  const [token, setStateToken] = useState('');
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  HttpService.setToken(token);

  async function refreshUser() {
    if (token === '') {
      setCurrentUser(null);
      return;
    }
    try {
      const user = await ApiService.users.me();
      setCurrentUser(user);
    } catch (e) {
      removeToken();
    }
  }

  async function setToken(newToken: string) {
    setStateToken(newToken);
    await AsyncStorage.setItem('token', newToken);
    HttpService.setToken(newToken);
  }

  function isAuthenticated(): boolean {
    return token !== '';
  }

  async function removeToken() {
    setToken('');
  }

  async function getToken() {
    const storedToken = (await AsyncStorage.getItem('token')) ?? '';
    setToken(storedToken);
  }

  useEffect(() => {
    getToken();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    currentUser,
    token,
    setToken,
    removeToken,
    refreshUser,
    isAuthenticated,
    isLoaded,
  };
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const context: Context = useAuthProvider();

  return (
    <AuthContext.Provider value={context}>
      {context.isLoaded ? (
        children
      ) : (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): Context => React.useContext(AuthContext);
