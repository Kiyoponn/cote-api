import { characters } from '@prisma/client'
import { Characteristics, ProfessionalStatus } from '../../utils/types'

export type Characters = {
  name: string
  nickname: string | null
  image: string | null
  characteristics: Characteristics
  professionalstatus: ProfessionalStatus
}

export type CharactersWithId = characters

export const selectCharacteristics = {
  gender: true,
  age: true,
  dob: true,
  height: true,
  hairColor: true,
  eyeColor: true,
}

export const selectProfessionalStatus = {
  studentId: true,
  occupation: true,
  year: true,
  grade: true,
  club: true,
  group: true,
}
