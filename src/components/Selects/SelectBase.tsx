import { PickerSelectProps } from 'react-native-picker-select';
import RNPickerSelect from 'react-native-picker-select';
import { ViewStyle, StyleSheet, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

export interface SelectBaseProps extends Omit<PickerSelectProps, 'style'> {
  style?: ViewStyle;
  name: string;
  placeholder?: string;
}

export function SelectBase(props: SelectBaseProps): JSX.Element {
  const { style, name, placeholder, ...rest } = props;

  const theme = useTheme();
  return (
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
          ...pickerSelectBaseStyles,
          iconContainer: {
            top: 12,
            right: 5,
          },
          placeholder: { color: theme.colors.outline },
          inputIOS: {
            ...pickerSelectBaseStyles.inputIOS,
            color: theme.dark ? 'white' : 'black',
          },
        }}
        placeholder={{
          label: placeholder,
          value: null,
          color: theme.colors.scrim,
        }}
        doneText="OK"
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
  );
}

const pickerSelectBaseStyles = StyleSheet.create({
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
