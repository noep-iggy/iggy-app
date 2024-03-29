import { ApiService } from '@/api';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import i18n from '@/locales/localization';
import { AffiliateSearchParams, AnimalTypeEnum } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Checkbox, List } from 'react-native-paper';
import { useAppTheme } from '../_layout';

const FilterShopModal = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [brands, setBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState<AffiliateSearchParams>();

  async function fetchBrands() {
    const brandsFetched = await ApiService.affiliates.getBrands();
    setBrands(brandsFetched);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (params?.filters) {
      setFilters(JSON.parse(params.filters as string));
    }
  }, [params]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UniversalSafeArea
        style={[
          {
            justifyContent: 'space-between',
            padding: 16,
            paddingVertical: 50,
          },
        ]}
        asView
      >
        <ScrollView style={{ marginVertical: 16 }}>
          <List.Section
            titleStyle={{
              fontSize: 25,
              fontWeight: 'bold',
            }}
            title={i18n.t('generics.filterBy')}
          >
            <List.Accordion
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outline,
              }}
              title="Marques"
              titleStyle={{ fontSize: 15 }}
              left={(props) => <List.Icon {...props} icon="tag" />}
            >
              {brands.map((brand) => (
                <Checkbox.Item
                  key={brand}
                  label={brand}
                  status={
                    filters?.brands?.includes(brand) ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      brands: prevFilters?.brands?.includes(brand)
                        ? prevFilters?.brands?.filter((b) => b !== brand)
                        : [...(prevFilters?.brands ?? []), brand],
                      page: 0,
                    }));
                  }}
                />
              ))}
            </List.Accordion>
            <List.Accordion
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outline,
              }}
              title="Prix"
              titleStyle={{ fontSize: 15 }}
              left={(props) => <List.Icon {...props} icon="currency-eur" />}
            >
              <Checkbox.Item
                label="Moins de 50€"
                status={
                  filters?.maxPrice === 50 && filters?.minPrice === 0
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    maxPrice: 50,
                    minPrice: 0,
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Entre 50€ et 100€"
                status={
                  filters?.maxPrice === 100 && filters?.minPrice === 50
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    maxPrice: 100,
                    minPrice: 50,
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Entre 100€ et 200€"
                status={
                  filters?.maxPrice === 200 && filters?.minPrice === 100
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    maxPrice: 200,
                    minPrice: 100,
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Plus de 200€"
                status={
                  filters?.maxPrice === 0 && filters?.minPrice === 200
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    maxPrice: 0,
                    minPrice: 200,
                    page: 0,
                  }));
                }}
              />
            </List.Accordion>
            <List.Accordion
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outline,
              }}
              title="Animaux"
              titleStyle={{ fontSize: 15 }}
              left={(props) => <List.Icon {...props} icon="dog" />}
            >
              {Object.values(AnimalTypeEnum).map((type) => (
                <Checkbox.Item
                  key={type}
                  label={i18n.t(`enums.type.${type}`)}
                  status={
                    filters?.animalTypes?.includes(type)
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      animalTypes: prevFilters?.animalTypes?.includes(type)
                        ? prevFilters?.animalTypes?.filter((b) => b !== type)
                        : [...(prevFilters?.animalTypes ?? []), type],
                      page: 0,
                    }));
                  }}
                />
              ))}
            </List.Accordion>
          </List.Section>
          <List.Section
            titleStyle={{
              marginTop: 30,
              fontSize: 25,
              fontWeight: 'bold',
            }}
            title={i18n.t('generics.orderBy')}
          >
            <List.Accordion
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outline,
              }}
              title="Type"
              titleStyle={{ fontSize: 15 }}
              left={(props) => <List.Icon {...props} icon="arrow-up-down" />}
            >
              <Checkbox.Item
                label="Croissant"
                status={filters?.orderType === 'ASC' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    orderType: 'ASC',
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Décroissant"
                status={filters?.orderType === 'DESC' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    orderType: 'DESC',
                    page: 0,
                  }));
                }}
              />
            </List.Accordion>
            <List.Accordion
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outline,
              }}
              title="Par"
              titleStyle={{ fontSize: 15 }}
              left={(props) => (
                <List.Icon {...props} icon="order-bool-ascending" />
              )}
            >
              <Checkbox.Item
                label="Date"
                status={
                  filters?.orderBy === 'createdAt' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    orderBy: 'createdAt',
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Prix"
                status={
                  filters?.orderBy === 'discountPrice' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    orderBy: 'discountPrice',
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Nom"
                status={filters?.orderBy === 'title' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    orderBy: 'title',
                    page: 0,
                  }));
                }}
              />
              <Checkbox.Item
                label="Animaux"
                status={
                  filters?.orderBy === 'animals' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    orderBy: 'animals',
                    page: 0,
                  }));
                }}
              />
            </List.Accordion>
          </List.Section>
        </ScrollView>
        <SecondaryButton
          style={{ marginBottom: 16 }}
          title="Réinitialiser"
          onPress={() => {
            router.back();
            router.setParams({
              filters: JSON.stringify({
                page: 0,
                orderBy: 'createdAt',
                orderType: 'DESC',
                pageSize: 10,
              }),
            });
          }}
        />
        <PrimaryButton
          title="Appliquer"
          big
          onPress={() => {
            router.back();
            router.setParams({
              filters: JSON.stringify(filters),
            });
          }}
        />
      </UniversalSafeArea>
    </KeyboardAvoidingView>
  );
};

export default FilterShopModal;
