import { View, Text, Image } from 'react-native';
import { AnimalStatusEnum } from '@/types';
import i18n from '@/locales/localization';

interface HappinessIndicatorProps {
  status: AnimalStatusEnum;
}

const HappinessIndicator = (props: HappinessIndicatorProps) => {
  const { status } = props;
  const happinessMeter = require('@/assets/images/happinessMeter.png');
  const happinessArrow = require('@/assets/images/happinessArrow.png');

  const statusResolver = () => {
    switch (status) {
      case AnimalStatusEnum.HAPPY:
        return '-45deg';
      case AnimalStatusEnum.SAD:
        return '45deg';
      default:
        return '0deg';
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
      }}
    >
      <Image
        source={happinessArrow}
        resizeMode="contain"
        style={{
          height: 20,
          position: 'absolute',
          top: 24,
          left: 16,
          transform: [{ rotate: statusResolver() }],
        }}
      />
      <Image
        source={happinessMeter}
        resizeMode="contain"
        style={{ width: 70 }}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        }}
      >
        {i18n.t(`enums.status.${status}`)}
      </Text>
    </View>
  );
};

export default HappinessIndicator;
