import { characters, professionalstatus, characteristics } from '@prisma/client';

export type Characters = {
  name: string;
  nickname: string | null;
  image: string | null;
  professionalstatus: Pick<professionalstatus, 'schoolId' | 'year' | 'grade' | 'club' | 'group' | 'occupation' | 'affiliation'>;
  characteristics: Pick<characteristics, 'gender' | 'age' | 'dateOfBirth' | 'height' | 'hairColor' | 'eyeColor'>;
};

export type CharactersWithId = characters;
