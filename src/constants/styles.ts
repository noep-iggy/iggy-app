import { StyleSheet } from 'react-native';

export const genericStyles = StyleSheet.create({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexEvenly: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
