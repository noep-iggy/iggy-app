import { genericStyles } from '@/constants';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper(props: StepperProps): JSX.Element {
  const { currentStep, totalSteps } = props;

  return (
    <View
      style={[
        genericStyles.flexRow,
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
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
                  index <= currentStep - 1 ? '#228752' : '#EFEFEF',
                marginHorizontal: 10,
              }}
            >
              <Text
                variant="titleLarge"
                style={{ color: index <= currentStep - 1 ? 'white' : 'black' }}
              >
                {index + 1}
              </Text>
              <View
                style={{
                  width: 20,
                  height: 5,
                  backgroundColor:
                    index <= currentStep - 1 ? '#228752' : '#EFEFEF',
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
}
