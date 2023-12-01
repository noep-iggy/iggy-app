import BaseButton from './BaseButton';

export type TertiaryButtonProps = {
  // Primary button props
} & React.ComponentProps<typeof BaseButton>;

const TertiaryButton = (props: TertiaryButtonProps) => {
  return <BaseButton mode="text" {...props} />;
};

export default TertiaryButton;
