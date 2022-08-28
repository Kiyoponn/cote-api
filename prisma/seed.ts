import { PrismaClient } from "@prisma/client"
import { characteristics, characters, professionalstatus } from "../src/utils/scrapper"

const db = new PrismaClient()

async function seed() {
  const data = await db.characters.findMany()

  if (data) {
    await db.characters.deleteMany()
    await db.$queryRaw`ALTER TABLE characters AUTO_INCREMENT = 1;`
    await db.$queryRaw`ALTER TABLE characteristics AUTO_INCREMENT = 1;`
    await db.$queryRaw`ALTER TABLE professionalstatus AUTO_INCREMENT = 1;`
  }

  const _characters = await characters()
  const _characteristics = await characteristics()
  const _professionalstatus = await professionalstatus()

  await db.characters.createMany({
    data: _characters,
  })

  await db.characteristics.createMany({
    data: _characteristics
  })

  await db.professionalstatus.createMany({
    data: _professionalstatus
  })

  return
}

seed()
