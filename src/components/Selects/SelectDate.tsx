import { formatDate, formatDateTime } from '@/utils';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Pressable, ViewProps, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon, Text, useTheme } from 'react-native-paper';

interface SelectDateProps extends ViewProps {
  placeholder?: string;
  name: string;
  mode?: 'date' | 'time' | 'datetime';
}

export function SelectDate(props: SelectDateProps): JSX.Element {
  const { name, placeholder, style, mode = 'date', ...rest } = props;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const { control } = useFormContext();
  const { errors } = useFormState();
  const theme = useTheme();
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Pressable
            style={[{ ...pickerSelectStyles.select }, style]}
            onPress={() => setIsDatePickerVisible(true)}
            {...rest}
          >
            {value ? (
              <Text style={{ ...pickerSelectStyles.text }} variant="bodyMedium">
                {mode === 'date' ? formatDate(value) : formatDateTime(value)}
              </Text>
            ) : (
              <Text
                variant="bodyMedium"
                style={[
                  pickerSelectStyles.text,
                  { color: theme.colors.outline },
                ]}
              >
                {placeholder}
              </Text>
            )}

            <Icon source="chevron-down" color="grey" size={20} />
            <DateTimePickerModal
              confirmTextIOS="OK"
              cancelTextIOS="Annuler"
              isVisible={isDatePickerVisible}
              mode={mode}
              locale="fr_FR"
              date={value}
              onConfirm={(value) => {
                onChange(new Date(value));
                setIsDatePickerVisible(false);
              }}
              onCancel={() => setIsDatePickerVisible(false)}
            />
          </Pressable>
        )}
        name={name}
      />
      <ErrorMessage name={name} errors={errors} />
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  select: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
});
