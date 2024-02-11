import React from 'react';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAuthContext } from '@/contexts';
import i18n from '@/locales/localization';
import { useAppTheme } from '../_layout';
import { StatusBar } from 'expo-status-bar';

const ChildSettings = () => {
  const { removeToken } = useAuthContext();
  const theme = useAppTheme();
  return (
    <>
      <StatusBar style="auto" />
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
          }}
        />
      </UniversalSafeArea>
    </>
  );
};

export default ChildSettings;
