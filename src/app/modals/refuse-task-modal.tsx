import { ApiService } from '@/api';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Input } from '@/components/Inputs';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../_layout';

const RefuseTaskModal = () => {
  const [value, setValue] = useState<string>('');
  const [isRefuseLoading, setIsRefuseLoading] = useState(false);
  const params = useLocalSearchParams();
  const theme = useAppTheme();
  const [taskId, setTaskId] = useState<string>();

  async function refuseTask() {
    if (!taskId) return;
    setIsRefuseLoading(true);
    await ApiService.tasks.refuse(taskId, {
      message: value,
    });
    router.back();
    setIsRefuseLoading(false);
  }

  useEffect(() => {
    if (!params) return;
    setTaskId(params.id as string);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UniversalSafeArea
        style={[
          {
            justifyContent: 'space-between',
            padding: 16,
            paddingVertical: 50,
          },
        ]}
        asView
      >
        <Text
          variant="headlineMedium"
          style={{ textAlign: 'center', marginTop: 20 }}
        >
          {i18n.t('tasks.confirmRefuse.subtitle')}
        </Text>
        <Input
          value={value}
          onChangeText={(text) => setValue(text)}
          label={i18n.t('fields.message.label')}
          placeholder={i18n.t('fields.message.placeholder')}
          multiline
          returnKeyType="done"
          returnKeyLabel="Terminé"
          onSubmitEditing={(e) => e.nativeEvent.text}
          blurOnSubmit
        />
        <View
          style={[
            genericStyles.flexRow,
            { width: '100%', justifyContent: 'center' },
          ]}
        >
          <SecondaryButton
            style={{
              marginRight: 8,
            }}
            onPress={() => router.back()}
            title={i18n.t('generics.back')}
            big
          />
          <PrimaryButton
            style={{
              marginLeft: 8,
              width: '60%',
              backgroundColor: theme.colors.error,
            }}
            onPress={() => refuseTask()}
            title={i18n.t('tasks.refuse')}
            big
            loading={isRefuseLoading}
            disabled={isRefuseLoading}
          />
        </View>
      </UniversalSafeArea>
    </KeyboardAvoidingView>
  );
};

export default RefuseTaskModal;
