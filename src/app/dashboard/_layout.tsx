import { AuthWall } from '@/components/AuthWall';
import { Slot, Stack } from 'expo-router';

const DashboardLayout = () => {
  return (
    <AuthWall>
      <Stack.Screen options={{ headerShown: false }} />
      <Slot />
    </AuthWall>
  );
};

export default DashboardLayout;
