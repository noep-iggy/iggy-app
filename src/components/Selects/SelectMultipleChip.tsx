import { useAppTheme } from '@/app/_layout';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext, useFormState, Controller } from 'react-hook-form';
import { View, ViewProps } from 'react-native';
import { ActivityIndicator, Chip, Divider, Text } from 'react-native-paper';

interface SelectMultipleChipProps extends ViewProps {
  label?: string;
  name: string;
  items: { label: string; value: string }[];
  isLoading?: boolean;
}

export function SelectMultipleChip(
  props: SelectMultipleChipProps
): JSX.Element {
  const { label, name, items, isLoading, ...rest } = props;
  const { control } = useFormContext();
  const { errors } = useFormState();
  const theme = useAppTheme();

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              marginTop: 3,
            }}
            {...rest}
          >
            <Text variant="bodyLarge">{label}</Text>
            <Divider style={{ marginTop: 3 }} />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 4,
                marginTop: 10,
              }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                items.map((item) => (
                  <Chip
                    key={item.value}
                    selected={value?.includes(item.value)}
                    onPress={() => {
                      if (value?.includes(item.value)) {
                        onChange(value.filter((v: string) => v !== item.value));
                      } else {
                        onChange([...(value ?? []), item.value]);
                      }
                    }}
                  >
                    {item.label}
                  </Chip>
                ))
              )}
            </View>
          </View>
        )}
        name={name}
      />
      <ErrorMessage name={name} errors={errors} />
    </>
  );
}
