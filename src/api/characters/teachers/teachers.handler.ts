import { NextFunction, Request, Response } from 'express'

import { db } from '../../../db'
import {
  CharactersWithId,
  selectCharacteristics,
  selectProfessionalStatus,
} from '../characters.model'

export async function findMany(
  _: Request,
  res: Response<CharactersWithId[]>,
  next: NextFunction
) {
  try {
    const characters = await db.characters.findMany({
      where: {
        professionalStatus: {
          occupation: {
            startsWith: 'Teacher',
          },
        },
      },
      include: {
        characteristics: {
          select: selectCharacteristics,
        },
        professionalStatus: {
          select: selectProfessionalStatus,
        },
      },
    })

    res.json(characters)
  } catch (error) {
    next(error)
  }
}
