import BaseButton from './BaseButton';

export type SecondaryButtonProps = {
  // Primary button props
} & React.ComponentProps<typeof BaseButton>;

const SecondaryButton = (props: SecondaryButtonProps) => {
  return <BaseButton mode="outlined" {...props} />;
};

export default SecondaryButton;
