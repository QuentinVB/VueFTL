import { Router } from 'express'
import categoriesRouter from './categories'
import ingredientsRouter from './ingredients'
import recipesRouter from './recipes'
import reviewsRouter from './reviews'
import userRouter from './user'


const router = Router()

router.use('/categories', categoriesRouter)
router.use('/recipes', recipesRouter)
router.use('/ingredients', ingredientsRouter)
router.use('/reviews', reviewsRouter)
router.use('/user', userRouter)

export default router