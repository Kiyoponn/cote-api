import { Router } from 'express'

import * as TeachersHandler from './teachers.handler'

const router = Router()

// route for /api/v1/characters/teachers
router.get('/', TeachersHandler.findMany)

export default router
