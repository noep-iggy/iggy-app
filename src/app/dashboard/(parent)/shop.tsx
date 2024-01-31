import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import {
  AffiliateDto,
  AffiliateSearchParams,
  ApiSearchResponse,
} from '@/types';
import { ApiService } from '@/api';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useState, useCallback, useEffect } from 'react';
import { useTheme, Text } from 'react-native-paper';
import { RefreshScroll } from '@/components/Scroll';
import { AffiliateCard } from '@/components/Card/AffiliateCard';
import { SimpleGrid } from 'react-native-super-grid';
import i18n from '@/locales/localization';
import { View } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { ROUTES } from '@/router/routes';
import { genericStyles } from '@/constants';

const Shop = () => {
  const theme = useTheme();
  const params = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [affiliates, setAffiliates] =
    useState<ApiSearchResponse<AffiliateDto>>();

  const [filters, setFilters] = useState<AffiliateSearchParams>({
    page: 0,
  });

  async function fetchAffiliates() {
    setIsLoading(true);
    const affiliatesFetched = await ApiService.affiliates.getAll(filters);
    setAffiliates(affiliatesFetched);

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchAffiliates();
    }, [filters])
  );

  useEffect(() => {
    if (params?.filters) {
      setFilters(JSON.parse(params.filters as string));
    }
  }, [params]);

  return (
    <UniversalSafeArea asView>
      <View style={{ marginTop: 32, marginBottom: 16, paddingHorizontal: 16 }}>
        <View
          style={[
            genericStyles.flexRow,
            { justifyContent: 'space-between', alignContent: 'center' },
          ]}
        >
          <Text variant="titleLarge">
            {`${affiliates?.total ?? 0} ${i18n.t('shop.totalProduct')}`}
          </Text>
          <PrimaryButton
            icon="filter-variant"
            onPress={() => {
              router.push(ROUTES.modals.filtersShopModal);
              router.setParams({
                filters: JSON.stringify(filters),
              });
            }}
            title={i18n.t('generics.filter')}
          />
        </View>
        <Text variant="bodyMedium" style={{ marginTop: 10 }}>
          {i18n.t('shop.subTitle')}
        </Text>
      </View>
      <RefreshScroll
        isEmpty={affiliates?.total === 0}
        isLoading={isLoading}
        onRefresh={() => fetchAffiliates()}
      >
        <SimpleGrid
          itemContainerStyle={{ justifyContent: 'flex-start' }}
          data={affiliates?.items ?? []}
          renderItem={({ item }) => <AffiliateCard affiliate={item} />}
          listKey={undefined}
        />
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default Shop;
