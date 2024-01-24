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

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function RefreshScroll(props: RefreshScrollProps): JSX.Element {
  const {
    isLoading,
    children,
    onNextPage,
    onRefresh,
    isEmpty,
    emptyText = 'Generics Empty',
    showsVerticalScrollIndicator = false,
    ...restProps
  } = props;
  const pageSize = 300;

  const debouncedNextPage = debounce(() => {
    if (!isLoading && onNextPage) {
      onNextPage();
    }
  }, 800);

  const debouncedRefresh = debounce(() => {
    if (!isLoading && onRefresh) {
      onRefresh();
    }
  }, 800);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 0;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      if (!isLoading && onNextPage && contentSize.height >= pageSize) {
        debouncedNextPage();
      }
    }
  };

  const handleRefresh = () => {
    if (!isLoading && debouncedRefresh) {
      debouncedRefresh();
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
