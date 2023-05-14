import { Router } from 'express'

import userRouter from './user'
import shipRouter from './ship'


const router = Router()

router.use('/user', userRouter)
router.use('/ship', shipRouter)

export default router