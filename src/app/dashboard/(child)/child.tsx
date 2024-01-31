import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/router/routes';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Icon,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { animalAnimationResolver } from '@/utils/animal';
import { AnimalTypeEnum } from '@/types';

const ChildDashboard = () => {
  const splashImage = require('@/assets/images/app/splash.png');
  const { removeToken } = useAuthContext();
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        resizeMode="cover"
        source={splashImage}
        style={{ height: '100%', width: '100%' }}
      >
        <UniversalSafeArea style={{ backgroundColor: 'transparent' }}>
          <View
            style={{
              flexDirection: 'column',
              gap: 16,
              height: '100%',
            }}
          >
            <ScrollView
              horizontal
              decelerationRate={0}
              snapToInterval={windowWidth}
              snapToAlignment="center"
            >
              <View
                style={{ width: windowWidth, height: '100%', paddingTop: 70 }}
              >
                <Text
                  variant="headlineLarge"
                  style={{
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Pépito
                </Text>
                <View
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 1,
                  }}
                >
                  <LottieView
                    autoPlay={true}
                    source={animalAnimationResolver(AnimalTypeEnum.DOG)}
                    style={{
                      alignSelf: 'center',
                      height: 'auto',
                    }}
                  />
                </View>
              </View>
            </ScrollView>
            <Surface
              style={{
                backgroundColor: theme.colors.surface,
                padding: 16,
                paddingBottom: 26,
                borderRadius: 8,
                maxHeight: 175,
                marginHorizontal: 16,
                gap: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Text
                  variant="titleLarge"
                  style={{
                    fontWeight: '500',
                    color: theme.colors.onSurface,
                    minHeight: 0,
                  }}
                >
                  Tâches à faire
                </Text>
                <View>
                  <Icon
                    size={48}
                    source="octagram"
                    color={theme.colors.inversePrimary}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      top: '50%',
                      color: theme.colors.onPrimaryContainer,
                      textAlign: 'center',
                      transform: [{ translateY: -10 }],
                      fontWeight: 'bold',
                      width: 48,
                      fontSize: 16,
                    }}
                  >
                    3
                  </Text>
                </View>
              </View>
              <View>
                <TouchableRipple
                  onPress={() => router.push(ROUTES.task.childDetail)}
                >
                  <Surface
                    style={{
                      maxHeight: 75,
                      borderRadius: 8,
                      backgroundColor: theme.colors.inversePrimary,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 14,
                      paddingVertical: 12,
                    }}
                  >
                    <View>
                      <Text variant="titleMedium">Donner à boire</Text>
                      <Text variant="labelSmall">Hier - 19h30</Text>
                    </View>
                    <Icon
                      size={32}
                      source="alarm"
                      color={theme.colors.onPrimaryContainer}
                    />
                  </Surface>
                </TouchableRipple>
                <TouchableRipple
                  disabled
                  style={{
                    position: 'absolute',
                    width: '100%',
                    transform: [{ translateY: 15 }, { scale: 0.9 }],
                    zIndex: -1,
                  }}
                  onPress={() => router.push(ROUTES.task.childDetail)}
                >
                  <Surface
                    style={{
                      maxHeight: 75,
                      borderRadius: 8,
                      backgroundColor: theme.colors.inversePrimary,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 14,
                      paddingVertical: 12,
                    }}
                  >
                    <View>
                      <Text variant="titleMedium">Donner à boire</Text>
                      <Text variant="labelSmall">Hier - 19h30</Text>
                    </View>
                    <Icon
                      size={32}
                      source="alarm"
                      color={theme.colors.onPrimaryContainer}
                    />
                  </Surface>
                </TouchableRipple>
              </View>
            </Surface>
          </View>
        </UniversalSafeArea>
      </ImageBackground>
    </>
  );
};

export default ChildDashboard;
