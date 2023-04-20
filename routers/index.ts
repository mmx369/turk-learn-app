import { Router } from 'express'
import { body } from 'express-validator'
import userAuthController from '../controllers/authController'
import authMiddleware from '../middleware/authMiddleware'

//@ts-ignore
const router = new Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userAuthController.registration
)
router.post('/login', userAuthController.login)
router.post('/logout', userAuthController.logout)

router.get('/activate/:link', userAuthController.activate)
router.get('/refresh', userAuthController.refresh)
router.get('/users', authMiddleware, userAuthController.getUsers)

export default router
