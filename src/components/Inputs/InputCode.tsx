import { useAppTheme } from '@/app/_layout';
import { useState, useRef, useEffect } from 'react';
import {
  TextInput,
  TextStyle,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

interface InputCodeProps {
  error?: boolean;
  onChangeText?: (code: string) => void;
}

export function InputCode(props: InputCodeProps): JSX.Element {
  const { onChangeText, error } = props;
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));
  const theme = useAppTheme();

  useEffect(() => {
    inputRefs.current.forEach((ref, index) => {
      if (ref && index < inputRefs.current.length - 1) {
        ref.setNativeProps({ text: code[index] });
      }
    });
  }, [code]);

  const inputStyled: TextStyle = {
    width: 50,
    height: 70,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: error ? theme.colors.error : theme.colors.outline,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: error ? theme.colors.error : theme.colors.onSurface,
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newCode = [...code];
      if (index > 0 && newCode[index] === '') {
        newCode[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
        setCode(newCode);
      }
    }
  };

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    if (text.length > 0) {
      const nextIndex = index + 1;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  useEffect(() => {
    onChangeText?.(code.join(''));
  }, [code]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      {...props}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={inputStyled}
          keyboardType="number-pad"
          maxLength={1}
          value={code[index]}
          onChangeText={(text) => handleTextChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
}
