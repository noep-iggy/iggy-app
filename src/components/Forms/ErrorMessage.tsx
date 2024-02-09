import { FieldErrors } from 'react-hook-form';
import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import i18n from '@/locales/localization';
import { genericStyles } from '@/constants';
import { useAppTheme } from '@/app/_layout';

interface ErrorMessageProps {
  icon?: boolean;
  errors?: FieldErrors;
  name: string;
}

export function ErrorMessage(props: ErrorMessageProps): JSX.Element {
  const { icon = true, errors, name } = props;
  const theme = useAppTheme();

  return (
    <HookFormErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => {
        return (
          (
            <View
              style={[
                genericStyles.flexRow,
                { marginTop: 2, gap: 2, paddingLeft: 5 },
              ]}
            >
              {icon && (
                <Icon
                  source="alert-circle-outline"
                  color={theme.colors.error}
                  size={15}
                />
              )}
              <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                {i18n.t(message)}
              </Text>
            </View>
          ) ?? null
        );
      }}
    />
  );
}
