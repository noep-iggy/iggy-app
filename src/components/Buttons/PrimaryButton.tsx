import BaseButton from './BaseButton';

export type PrimaryButtonProps = {
  // Primary button props
} & React.ComponentProps<typeof BaseButton>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  return <BaseButton mode="contained" {...props} />;
};

export default PrimaryButton;
