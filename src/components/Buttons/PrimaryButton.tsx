import BaseButton from './BaseButton';
import { useAppTheme } from '@/app/_layout';

export type PrimaryButtonProps = {
  // Primary button props
} & React.ComponentProps<typeof BaseButton>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  const theme = useAppTheme();
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
