import {
  characteristics,
  charactersInfo,
  professionalStatus,
} from '../src/utils/scrapper'
import { db } from '../src/db'

async function seed() {
  const data = await db.characters.findMany()

  if (data) {
    await db.characters.deleteMany({})
    await db.characteristics.deleteMany({})
    await db.professionalstatus.deleteMany({})

    await db.$queryRaw`ALTER SEQUENCE "characters_id_seq" RESTART WITH 1`
    await db.$queryRaw`ALTER SEQUENCE "characteristics_id_seq" RESTART WITH 1`
    await db.$queryRaw`ALTER SEQUENCE "professionalstatus_id_seq" RESTART WITH 1`

    console.log(`Database has been reset. 🧹`)
  }

  const Characters = await charactersInfo()
  const Characteristics = await characteristics()
  const ProfessionalStatus = await professionalStatus()

  await db.characters.createMany({
    data: Characters,
  })

  await db.characteristics.createMany({
    data: Characteristics,
  })

  await db.professionalstatus.createMany({
    data: ProfessionalStatus,
  })

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
