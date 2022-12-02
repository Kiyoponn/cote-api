import { characteristics, characters, professionalstatus } from '../src/utils/scrapper';
import { db } from '../src/db';

async function seed() {
  const data = await db.characters.findMany();

  if (data) {
    await db.characters.deleteMany();
    await db.$queryRaw`ALTER TABLE characters AUTO_INCREMENT = 1;`;
    await db.$queryRaw`ALTER TABLE characteristics AUTO_INCREMENT = 1;`;
    await db.$queryRaw`ALTER TABLE professionalstatus AUTO_INCREMENT = 1;`;
  }

  const c = await characters();
  const cs = await characteristics();
  const ps = await professionalstatus();

  await db.characters.createMany({
    data: c,
  });

  await db.characteristics.createMany({
    data: cs,
  });

  await db.professionalstatus.createMany({
    data: ps,
  });

  return;
}

seed();
