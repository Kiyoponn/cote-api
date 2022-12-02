import { NextFunction, Request, Response } from 'express';

import { db } from '../../../db';
import { CharactersWithId } from '../characters.model';

export async function findMany(_: Request, res: Response<CharactersWithId[]>, next: NextFunction) {
  try {
    const characters = await db.characters.findMany({
      where: {
        professionalstatus: {
          occupation: {
            startsWith: 'Teacher',
          },
        },
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

    res.json(characters);
  } catch (error) {
    next(error);
  }
}
