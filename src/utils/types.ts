import type {
  characters,
  characteristics,
  professionalstatus,
} from '@prisma/client';

export type Character = Omit<characters, 'id'>;
export type Characteristics = Omit<characteristics, 'id'>;
export type ProfessionalStatus = Omit<professionalstatus, 'id'>;
