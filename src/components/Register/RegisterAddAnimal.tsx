import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { genericStyles } from '@/constants';
import i18n from '@/locales/localization';
import { AnimalDto } from '@/types';
import { ActivityIndicator, Image, View } from 'react-native';
import { Button, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { useAuthContext } from '@/contexts';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { ROUTES } from '@/router/routes';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { ApiService } from '@/api';
import { animalResolver } from '@/utils/animal';
import { clearHistoryAndRedirect } from '@/utils';

export function RegisterAddAnimal(): JSX.Element {
  const logo = require('@/assets/images/app/logo-color.png');
  const { currentUser } = useAuthContext();
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [isDelLoading, setIsDelLoading] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  async function onSubmit() {
    Toast.show({
      type: 'success',
      text1: `${i18n.t('success.register.title')} ${currentUser?.firstName} !`,
    });

    clearHistoryAndRedirect('dashboard', navigation);
  }

  async function fetchAnimals() {
    setIsLoading(true);
    const animals = await ApiService.house.getAnimals();
    setAnimals(animals);
    setIsLoading(false);
  }

  async function deleteAnimal(id: string) {
    setIsDelLoading(id);
    await ApiService.animals.deleteById(id);
    fetchAnimals();
    setIsDelLoading(undefined);
  }

  useEffect(() => {
    if (params?.refresh === 'true') {
      fetchAnimals();
      router.setParams({ refresh: 'false' });
    }
  }, [params]);

  return (
    <>
      <View
        style={[genericStyles.flexCenter, { width: '100%', gap: 5, flex: 1 }]}
      >
        <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
        <View>
          <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
            {i18n.t('registerPage.animal.title')}
          </Text>
          <Text variant="bodySmall" style={{ textAlign: 'center' }}>
            {i18n.t('registerPage.animal.subtitle')}
          </Text>
        </View>
        <View
          style={[
            genericStyles.flexColumn,
            { width: '100%', gap: 5, marginTop: 10 },
          ]}
        >
          {!isLoading ? (
            animals.map((animal) => (
              <View
                key={animal.id}
                style={[
                  genericStyles.flexRow,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  },
                ]}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 5,
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  <Image
                    source={animalResolver(animal.type)}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text variant="bodyLarge">{animal.name}</Text>
                <View style={[genericStyles.flexRow]}>
                  <IconButton
                    onPress={() => {
                      router.push(ROUTES.animal.update);
                      router.setParams({ id: animal.id });
                    }}
                    icon={({ size }) => (
                      <Icon
                        source="pencil"
                        size={size}
                        color={theme.colors.primary}
                      />
                    )}
                  />
                  {isDelLoading !== animal.id ? (
                    <IconButton
                      onPress={() => deleteAnimal(animal.id)}
                      icon={({ size }) => (
                        <Icon
                          source="trash-can-outline"
                          size={size}
                          color={theme.colors.error}
                        />
                      )}
                    />
                  ) : (
                    <ActivityIndicator
                      animating={true}
                      color={theme.colors.primary}
                    />
                  )}
                </View>
              </View>
            ))
          ) : (
            <ActivityIndicator animating={true} color={theme.colors.primary} />
          )}
          <Button
            onPress={() => router.push(ROUTES.animal.create)}
            icon={'plus'}
            mode="outlined"
            style={{ marginTop: 10 }}
          >
            {i18n.t('registerPage.animal.submit')}
          </Button>
        </View>
      </View>

      <PrimaryButton
        style={{ marginTop: 30 }}
        disabled={animals.length === 0}
        onPress={onSubmit}
        title={i18n.t('registerPage.createHouse')}
        big
      />
    </>
  );
}
