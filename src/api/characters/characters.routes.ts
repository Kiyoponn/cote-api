import { Router } from 'express'

import { ParamsWithId } from '../../interfaces/ParamsWithId'
import { validateRequest } from '../../middlewares'
import * as CharactersHandler from './characters.handler'
import teachers from './teachers/teachers.routes'
import students from './students/students.routes'

const router = Router()

// route for /api/v1/characters/teachers
router.use('/teachers', teachers)

// route for /api/v1/characters/students
router.use('/students', students)

// route for /api/v1/characters
router.get('/', CharactersHandler.findMany)

// route for /api/v1/characters/:id
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  CharactersHandler.findUnique
)

export default router
