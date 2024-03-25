import { TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface InputProps extends TextInputProps {}

export function Input(props: InputProps): JSX.Element {
  const {} = props;

  const inputStyled: TextStyle = {
    width: '100%',
  };

  return (
    <TextInput
      mode="outlined"
      autoCorrect={false}
      autoCapitalize="none"
      autoComplete="off"
      style={{ ...inputStyled }}
      {...props}
    />
  );
}
