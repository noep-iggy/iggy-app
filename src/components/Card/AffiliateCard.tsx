import { genericStyles } from '@/constants';
import { AffiliateDto } from '@/types';
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useTheme, Text, Chip } from 'react-native-paper';
import * as Linking from 'expo-linking';

interface AffiliateCardProps extends TouchableOpacityProps {
  affiliate: AffiliateDto;
}

export function AffiliateCard(props: AffiliateCardProps): JSX.Element {
  const { affiliate, style } = props;
  const { colors } = useTheme();
  const placeholder = require('@/assets/images/app/placeholder.png');

  return (
    <TouchableOpacity
      style={[
        genericStyles.flexColumn,
        {
          shadowOffset: { width: 2, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          backgroundColor: colors.surfaceDisabled,
          padding: 5,
          borderRadius: 8,
          maxHeight: 500,
        },
        style,
      ]}
      onPress={() => Linking.openURL(affiliate.url)}
      {...props}
    >
      <Image
        source={affiliate.image ? { uri: affiliate.image.url } : placeholder}
        style={{ width: '100%', height: 180, borderRadius: 8 }}
        resizeMode="cover"
      />
      <View style={[genericStyles.flexColumn, { marginTop: 5 }]}>
        <Text variant="titleMedium">{`${
          affiliate.title.length > 20
            ? affiliate.title.substring(0, 20) + '...'
            : affiliate.title
        }`}</Text>
      </View>
      <Text variant="bodySmall">
        {affiliate.description && affiliate.description.length > 50
          ? affiliate?.description?.substring(0, 50) + '...'
          : affiliate.description}
      </Text>
      <View style={[genericStyles.flexRow, { marginTop: 3 }]}>
        <Text
          variant="titleLarge"
          style={{ color: colors.error, textDecorationLine: 'line-through' }}
        >{`${affiliate.basePrice}€`}</Text>
        <Text
          variant="titleLarge"
          style={{ marginLeft: 10, color: colors.primary }}
        >
          {`${affiliate.discountPrice}€`}
        </Text>
      </View>
      <Chip
        compact
        icon="shopping"
        selected
        style={{ alignSelf: 'flex-end', marginTop: 3 }}
      >
        {affiliate.brand}
      </Chip>
    </TouchableOpacity>
  );
}
