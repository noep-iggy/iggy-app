import { ReactNode } from 'react';
import { RefreshControl, ScrollView, ScrollViewProps } from 'react-native';

interface RefreshScrollProps extends ScrollViewProps {
  children: ReactNode;
  isLoading: boolean;
  fetchDatas: () => void;
}

export function RefreshScroll(props: RefreshScrollProps): JSX.Element {
  const { children, isLoading, fetchDatas } = props;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            fetchDatas();
          }}
        />
      }
    >
      {isLoading ? null : children}
    </ScrollView>
  );
}
