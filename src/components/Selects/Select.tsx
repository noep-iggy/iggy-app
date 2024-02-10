import { PickerSelectProps } from 'react-native-picker-select';
import RNPickerSelect from 'react-native-picker-select';
import { ViewStyle, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useAppTheme } from '@/app/_layout';

export interface SelectProps
  extends Omit<PickerSelectProps, 'style' | 'onValueChange'> {
  style?: ViewStyle;
  name: string;
  placeholder?: string;
}

export function Select(props: SelectProps): JSX.Element {
  const { style, name, placeholder, ...rest } = props;
  const { control } = useFormContext();
  const { errors } = useFormState();
  const theme = useAppTheme();
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View
            style={[
              style,
              {
                position: 'relative',
              },
            ]}
          >
            <RNPickerSelect
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 12,
                  right: 5,
                },
                placeholder: { color: theme.colors.outline },
                inputIOS: {
                  ...pickerSelectStyles.inputIOS,
                  color: theme.dark ? 'white' : 'black',
                },
              }}
              placeholder={{
                label: placeholder,
                value: null,
                color: theme.colors.scrim,
              }}
              onValueChange={(value) => {
                onChange(value);
              }}
              value={value}
              doneText="OK"
              darkTheme={theme.dark}
              {...rest}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon source="chevron-down" color="grey" size={20} />
            </View>
          </View>
        )}
        name={name}
      />
      <ErrorMessage name={name} errors={errors} />
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30,
  },
});
