import { genericStyles } from '@/constants';
import { ROUTES } from '@/router/routes';
import { TaskDto } from '@/types';
import { animalResolver } from '@/utils/animal';
import { router } from 'expo-router';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Icon, Text, useTheme } from 'react-native-paper';

interface TaskAnimalCardProps {
  task: TaskDto;
  isAnimalVisible?: boolean;
}

const TaskAnimalCard = (props: TaskAnimalCardProps) => {
  const { task, isAnimalVisible } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: theme.colors.surfaceVariant,
      }}
      onPress={() => {
        router.push(ROUTES.animal.create);
      }}
    >
      <View style={[genericStyles.flexColumn]}>
        <Text
          variant="bodyLarge"
          style={{ fontWeight: 'bold', marginBottom: 1 }}
        >
          {task.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon source="account" size={16} />
          {task.users.map((user) => (
            <Text key={user.id} variant="bodySmall" style={{ marginLeft: 4 }}>
              {user.firstName}
            </Text>
          ))}
        </View>
      </View>
      <View style={[genericStyles.flexRow, { position: 'relative' }]}>
        {isAnimalVisible &&
          task.animals.map((animal, index) => (
            <Avatar.Image
              key={index} // Ajoutez une clé unique pour chaque Avatar
              size={40}
              source={animalResolver(animal.type)}
              style={{
                position: 'absolute',
                left: index * -20 - 35, // Ajustez la position horizontale en fonction de l'index
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                backgroundColor: theme.colors.surfaceVariant,
                borderWidth: 1,
                width: 45,
                height: 45,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}
            />
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default TaskAnimalCard;
