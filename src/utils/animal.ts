import { AnimalTypeEnum } from '@/types';

export function animalResolver(type?: AnimalTypeEnum) {
  const MEDIAS = {
    [AnimalTypeEnum.CAT]: require('@/assets/images/chat.png'),
    [AnimalTypeEnum.DOG]: require('@/assets/images/dog.png'),
  };
  switch (type) {
    case AnimalTypeEnum.CAT:
      return MEDIAS[AnimalTypeEnum.CAT];
    case AnimalTypeEnum.DOG:
      return MEDIAS[AnimalTypeEnum.DOG];
    default:
      return MEDIAS[AnimalTypeEnum.CAT];
  }
}

export function animalAnimationResolver(type: AnimalTypeEnum) {
  const MEDIAS = {
    [AnimalTypeEnum.CAT]: require('@/assets/animations/animals/cat/normal.json'),
    [AnimalTypeEnum.DOG]: require('@/assets/animations/animals/dog/normal.json'),
  };
  switch (type) {
    case AnimalTypeEnum.CAT:
      return MEDIAS[AnimalTypeEnum.CAT];
    case AnimalTypeEnum.DOG:
      return MEDIAS[AnimalTypeEnum.DOG];
    default:
      return MEDIAS[AnimalTypeEnum.CAT];
  }
}
