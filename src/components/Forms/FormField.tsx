import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Input, InputPassword } from '../Inputs';
import { TextInputProps } from 'react-native-paper';
import { View } from 'react-native';
import { ErrorMessage } from './ErrorMessage';

type FormFieldType = 'password' | 'text';

interface FormFieldProps extends TextInputProps {
  name: string;
  type?: FormFieldType;
}

function FormField({ type = 'text', name, ...props }: FormFieldProps) {
  const { control } = useFormContext();
  const { errors } = useFormState();

  let InputComponent: React.ComponentType<TextInputProps>;

  switch (type) {
    case 'password':
      InputComponent = InputPassword;
      break;
    default:
    case 'text':
      InputComponent = Input;
      break;
  }

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputComponent
            {...props}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors[name]}
          />
        )}
        name={name}
      />
      <ErrorMessage name={name} errors={errors} />
    </View>
  );
}

export default FormField;
