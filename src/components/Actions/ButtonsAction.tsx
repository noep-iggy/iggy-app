import { useState } from 'react';
import { FABGroupProps, FAB as Fab, useTheme } from 'react-native-paper';

interface ButtonsActionProps {
  items?: { icon: string; label: string; onPress: () => void }[];
  onPress?: () => void;
  icon?: string;
  style?: FABGroupProps['style'];
}

export function ButtonsAction(props: ButtonsActionProps): JSX.Element {
  const { items, onPress, icon = 'plus', style } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Fab.Group
      open={open}
      visible
      style={[
        {
          position: 'absolute',
          bottom: -15,
        },
        style,
      ]}
      icon={open ? 'close' : icon}
      actions={
        items
          ? items.map((item) => ({
              icon: item.icon,
              label: item.label,
              onPress: item.onPress,
            }))
          : []
      }
      onStateChange={items ? ({ open }) => setOpen(open) : () => {}}
      onPress={onPress}
    />
  );
}
