import { useTheme } from 'react-native-paper';
import BaseButton from './BaseButton';

export type PrimaryButtonProps = {
  // Primary button props
} & React.ComponentProps<typeof BaseButton>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  const theme = useTheme();
  return (
    <BaseButton
      mode="contained"
      buttonColor={props.buttonColor ?? theme.colors.primary}
      textColor={props.textColor ?? theme.colors.onPrimary}
      {...props}
    />
  );
};

export default PrimaryButton;
