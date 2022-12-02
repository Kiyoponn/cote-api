import { NextFunction, Request, Response } from 'express';

import { db } from '../../db';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { CharactersWithId } from './characters.model';

export async function findMany(_: Request, res: Response<CharactersWithId[]>, next: NextFunction) {
  try {
    const characters = await db.characters.findMany({
      select: {
        id: true,
        name: true,
        nickname: true,
        image: true,
        characteristics: true,
        professionalstatus: true,
      },
    });

    res.json(characters);
  } catch (error) {
    next(error);
  }
}

export async function findUnique(req: Request<ParamsWithId, CharactersWithId, {}>, res: Response<CharactersWithId>, next: NextFunction) {
  const { id } = req.params;
  try {
    const characters = await db.characters.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        nickname: true,
        image: true,
        characteristics: true,
        professionalstatus: true,
      },
    });

    if (!characters) {
      res.status(404);
      throw new Error(`Character with id ${id} not found`);
    }

    res.json(characters);
  } catch (error) {
    next(error);
  }
}
