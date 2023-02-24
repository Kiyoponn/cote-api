import {
  characteristics,
  charactersInfo,
  professionalStatus,
} from '../src/utils/scrapper'
import { db } from '../src/db'

async function seed() {
  await db.$queryRaw`DELETE FROM sqlite_sequence WHERE name='characters'`
  await db.$queryRaw`DELETE FROM sqlite_sequence WHERE name='characteristics'`
  await db.$queryRaw`DELETE FROM sqlite_sequence WHERE name='professionalstatus'`

  const Characters = await charactersInfo()
  const Characteristics = await characteristics()
  const ProfessionalStatus = await professionalStatus()

  for (const character of Characters) {
    const { name, nickname, japaneseName, image } = character
    await db.characters.create({
      data: {
        name,
        nickname,
        japaneseName,
        image,
      },
    })
  }

  for (const characteristics of Characteristics) {
    const { gender, age, dob, height, hairColor, eyeColor } = characteristics
    await db.characteristics.create({
      data: {
        gender,
        age,
        dob,
        height,
        hairColor,
        eyeColor,
      },
    })
  }

  for (const professionalstatus of ProfessionalStatus) {
    const { occupation, club, grade, group, studentId, year } =
      professionalstatus
    await db.professionalstatus.create({
      data: {
        studentId,
        occupation,
        year,
        grade,
        club,
        group,
      },
    })
  }

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
