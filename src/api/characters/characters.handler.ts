import { NextFunction, Request, Response } from 'express'

import { db } from '../../db'
import { ParamsWithId } from '../../interfaces/ParamsWithId'
import {
  CharactersWithId,
  selectCharacteristics,
  selectProfessionalStatus,
} from './characters.model'

export async function findMany(
  _: Request,
  res: Response<CharactersWithId[]>,
  next: NextFunction
) {
  try {
    const characters = await db.characters.findMany({
      include: {
        characteristics: true,
        professionalStatus: true,
      },
    })

    res.json(characters)
  } catch (error) {
    next(error)
  }
}

export async function findUnique(
  req: Request<ParamsWithId, CharactersWithId, {}>,
  res: Response<CharactersWithId>,
  next: NextFunction
) {
  const { id } = req.params
  try {
    const characters = await db.characters.findFirst({
      where: {
        id: Number(id),
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

    if (!characters) {
      res.status(404)
      throw new Error(`Character with id ${id} not found`)
    }

    res.json(characters)
  } catch (error) {
    next(error)
  }
}
