import { useState } from 'react';
import { TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface InputPasswordProps extends TextInputProps {}

export function InputPassword(props: InputPasswordProps): JSX.Element {
  const {} = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const inputStyled: TextStyle = {
    width: '100%',
  };

  return (
    <TextInput
      mode="outlined"
      secureTextEntry={!isVisible}
      style={{ ...inputStyled }}
      {...props}
      right={
        <TextInput.Icon
          icon={isVisible ? 'eye' : 'eye-off'}
          onPress={() => setIsVisible((v) => !v)}
        />
      }
    />
  );
}
