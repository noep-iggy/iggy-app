import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

export type PrimaryButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  big?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'children'>;

const BaseButton = ({ title, ...props }: PrimaryButtonProps) => {
  return (
    <Button
      style={[props.style, { borderRadius: 50 }]}
      contentStyle={[{ paddingVertical: props.big ? 6 : 0 }]}
      labelStyle={[{ fontWeight: 'bold' }, props.labelStyle]}
      {...props}
    >
      {title}
    </Button>
  );
};

export default BaseButton;
