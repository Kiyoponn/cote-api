import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import characters from './characters/characters.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_, res) => {
  res.json({
    message: 'Welcome to Classroom of the Elite API v1',
  });
});

router.use('/characters', characters);

export default router;
