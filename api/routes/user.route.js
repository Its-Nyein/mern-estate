import express, { Router } from 'express'
import { userController } from '../controllers/user.controller.js';

const router = express.Router()

router.get('/testing', userController)

export default router;