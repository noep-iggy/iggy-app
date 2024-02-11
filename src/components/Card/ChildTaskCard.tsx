import { View } from 'react-native';
import React from 'react';
import { TaskDto } from '@/types';
import { Surface, TouchableRipple, Text, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { ROUTES } from '@/router/routes';
import { formatDateTime } from '@/utils';
import { useAppTheme } from '@/app/_layout';

interface ChildTaskCardProps {
  task: TaskDto;
  isSecondary?: boolean;
}

const ChildTaskCard = (props: ChildTaskCardProps) => {
  const { task, isSecondary } = props;
  const theme = useAppTheme();
  return (
    <TouchableRipple
      disabled={isSecondary}
      style={
        isSecondary
          ? {
              position: 'absolute',
              width: '100%',
              transform: [{ translateY: 15 }, { scale: 0.9 }],
              zIndex: -1,
              opacity: 0.5,
            }
          : null
      }
      onPress={() => {
        router.push(ROUTES.task?.childDetail);
        router.setParams({ id: task?.id ?? '0' });
      }}
    >
      <Surface
        style={{
          maxHeight: 75,
          borderRadius: 8,
          backgroundColor: task?.isArchived
            ? theme.colors.warningContainer
            : theme.colors.inversePrimary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}
      >
        <View>
          <Text variant="titleMedium">{task?.title}</Text>
          <Text variant="labelSmall">{formatDateTime(task?.date)}</Text>
        </View>
        {task?.isArchived && (
          <Icon
            size={32}
            source="alarm"
            color={theme.colors.onWarningContainer}
          />
        )}
      </Surface>
    </TouchableRipple>
  );
};

export default ChildTaskCard;
