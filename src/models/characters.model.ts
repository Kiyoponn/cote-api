import { db } from "../utils/db.server"

export const getAllCharacters = async () => {
  return db.characters.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      nickname: true,
      characteristics: true,
      professionalstatus: true,
    },
    orderBy: {
      id: "asc"
    }
  })
}

export const getCharacter = async (id: number) => {
  return db.characters.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      name: true,
      image: true,
      nickname: true,
      characteristics: true,
      professionalstatus: true,
    }
  })
}
