import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import {
  AffiliateDto,
  AffiliateSearchParams,
  ApiSearchResponse,
} from '@/types';
import { ApiService } from '@/api';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { RefreshScroll } from '@/components/Scroll';
import { AffiliateCard } from '@/components/Card/AffiliateCard';
import i18n from '@/locales/localization';
import { View } from 'react-native';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { ROUTES } from '@/router/routes';
import { genericStyles } from '@/constants';
import { SimpleGrid } from 'react-native-super-grid';

const Shop = () => {
  const params = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [affiliatesFetched, setAffiliatesFetched] =
    useState<ApiSearchResponse<AffiliateDto>>();

  const [affiliates, setAffiliates] = useState<AffiliateDto[]>([]);

  const [filters, setFilters] = useState<AffiliateSearchParams>({
    page: 0,
    orderBy: 'createdAt',
    orderType: 'DESC',
    pageSize: 10,
  });

  async function fetchAffiliates(newFilters: AffiliateSearchParams) {
    setIsLoading(true);
    console.log('[D] shop', newFilters);
    const affiliatesFetched = await ApiService.affiliates.getAll(newFilters);
    setAffiliatesFetched(affiliatesFetched);
    setAffiliates((prevAffiliates) => [
      ...prevAffiliates,
      ...affiliatesFetched.items,
    ]);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchAffiliates(filters);
  }, []);

  useEffect(() => {
    if (params?.filters) {
      setAffiliates([]);
      const filters = JSON.parse(params.filters as string);
      setFilters(filters);
      fetchAffiliates(filters);
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
            {`${affiliatesFetched?.total ?? 0} ${i18n.t('shop.totalProduct')}`}
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
        emptyText={i18n.t('shop.noProduct')}
        isEmpty={affiliatesFetched?.total === 0}
        isLoading={isLoading}
        onRefresh={() => {
          setAffiliatesFetched(undefined);
          setAffiliates([]);
          setFilters({ page: 0, orderBy: 'createdAt', orderType: 'DESC' });
          fetchAffiliates({ page: 0, orderBy: 'createdAt', orderType: 'DESC' });
        }}
        onNextPage={() => {
          const newPage = (filters?.page ?? 0) + 1;
          setFilters({ ...filters, page: newPage });
          fetchAffiliates({ ...filters, page: newPage });
        }}
      >
        <SimpleGrid
          maxItemsPerRow={2}
          itemContainerStyle={{ justifyContent: 'flex-start' }}
          data={affiliates}
          renderItem={({ item }) => <AffiliateCard affiliate={item} />}
          listKey={undefined}
        />
      </RefreshScroll>
    </UniversalSafeArea>
  );
};

export default Shop;
