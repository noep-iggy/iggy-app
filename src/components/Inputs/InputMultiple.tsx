import { TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface InputMultipleProps extends TextInputProps {}

export function InputMultiple(props: InputMultipleProps): JSX.Element {
  const {} = props;

  const inputStyled: TextStyle = {
    width: '100%',
  };

  return (
    <TextInput
      mode="outlined"
      returnKeyLabel="Terminé"
      onSubmitEditing={(e) => e.nativeEvent.text}
      blurOnSubmit
      style={{
        ...inputStyled,
        height: 100,
      }}
      multiline
      {...props}
    />
  );
}
