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
  colCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  flexEndAndCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
