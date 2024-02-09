import { useAppTheme } from '@/app/_layout';
import { genericStyles } from '@/constants';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export const Stepper = (props: StepperProps): JSX.Element => {
  const { currentStep, totalSteps } = props;
  const theme = useAppTheme();

  return (
    <View
      style={[
        genericStyles.flexRow,
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 24,
        },
      ]}
    >
      {Array(totalSteps)
        .fill(0)
        .map((_, index) => {
          return (
            <View
              key={index}
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  index <= currentStep
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
                marginHorizontal: 10,
              }}
            >
              <Text
                variant="titleMedium"
                style={{
                  color:
                    index <= currentStep
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant,
                }}
              >
                {index + 1}
              </Text>
              <View
                style={{
                  width: 20,
                  height: 5,
                  backgroundColor:
                    index <= currentStep - 1
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                  position: 'absolute',
                  right: '-50%',
                  display: index === totalSteps - 1 ? 'none' : 'flex',
                }}
              />
            </View>
          );
        })}
    </View>
  );
};
