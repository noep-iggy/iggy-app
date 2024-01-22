import i18n from '@/locales/localization';
import {
  ScrollView,
  RefreshControl,
  ScrollViewProps,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';

interface RefreshScrollProps extends ScrollViewProps {
  isLoading: boolean;
  onRefresh: () => void;
  onNextPage?: () => void;
  isEmpty?: boolean;
  emptyText?: string;
}

export function RefreshScroll(props: RefreshScrollProps): JSX.Element {
  const {
    isLoading,
    children,
    onNextPage,
    onRefresh,
    isEmpty,
    emptyText = i18n.t('generics.empty'),
    showsVerticalScrollIndicator = false,
    ...restProps
  } = props;
  const pageSize = 120;

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 0; // Vous pouvez ajuster cette valeur selon vos besoins

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      // Vous avez atteint le bas de la liste
      if (!isLoading && onNextPage && contentSize.height >= pageSize) {
        onNextPage();
      }
    }
  };

  const handleRefresh = () => {
    if (!isLoading && onRefresh) {
      onRefresh();
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...restProps}
    >
      {isEmpty && !isLoading ? (
        <Text
          variant="bodyMedium"
          style={{
            textAlign: 'center',
            width: '100%',
            marginTop: 16,
          }}
        >
          {emptyText}
        </Text>
      ) : (
        children
      )}
      {isLoading && (
        <ActivityIndicator size="small" style={{ marginTop: 16 }} />
      )}
    </ScrollView>
  );
}
