import { Router } from 'express';

import * as StudentsHandler from './students.handler';

const router = Router();

// route for /api/v1/characters/teachers
router.get('/', StudentsHandler.findMany);

export default router;
