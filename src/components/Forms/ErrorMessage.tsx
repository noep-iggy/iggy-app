import { FieldErrors } from 'react-hook-form';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import i18n from '@/locales/localization';
import { genericStyles } from '@/constants';

interface ErrorMessageProps {
  icon?: boolean;
  errors?: FieldErrors;
  name: string;
}

export function ErrorMessage(props: ErrorMessageProps): JSX.Element {
  const { icon = true, errors, name } = props;

  return (
    <HookFormErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => {
        return (
          (
            <View style={[genericStyles.flexRow, { marginTop: 2, gap: 2 }]}>
              {icon && (
                <Icon source="alert-circle-outline" color={'red'} size={15} />
              )}
              <Text variant="bodySmall" style={{ color: 'red' }}>
                {i18n.t(message)}
              </Text>
            </View>
          ) ?? null
        );
      }}
    />
  );
}
