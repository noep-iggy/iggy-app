import React from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAuthContext } from '@/contexts';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import i18n from '@/locales/localization';
import { useTheme } from 'react-native-paper';

const ChildSettings = () => {
  const { removeToken } = useAuthContext();
  const theme = useTheme();
  return (
    <UniversalSafeArea
      asView
      style={{
        padding: 16,
      }}
    >
      <PrimaryButton
        title={i18n.t('generics.logout')}
        buttonColor={theme.colors.errorContainer}
        textColor={theme.colors.onErrorContainer}
        onPress={() => {
          removeToken();
          router.replace(ROUTES.auth.index);
        }}
      />
    </UniversalSafeArea>
  );
};

export default ChildSettings;