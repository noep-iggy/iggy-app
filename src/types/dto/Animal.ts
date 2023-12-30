import { BaseDto } from './BaseDto';
import { HouseDto } from './House';

export enum AnimalGenderEnum {
  MASCULINE = 'MASCULINE',
  FEMININE = 'FEMININE',
}

export enum AnimalTypeEnum {
  DOG = 'DOG',
  CAT = 'CAT',
}

export enum AnimalStatusEnum {
  SLEEPING = 'SLEEPING',
  HAPPY = 'HAPPY',
  NORMAL = 'NORMAL',
  SAD = 'SAD',
}

export interface AnimalDto extends BasicAnimalDto {
  bornDate: Date;
  gender: AnimalGenderEnum;
  status: AnimalStatusEnum;
  house: HouseDto;
  tasks?: string[];
}

export interface BasicAnimalDto extends BaseDto {
  name: string;
  type: AnimalTypeEnum;
}
