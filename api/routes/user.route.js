import express, { Router } from 'express'
import { updateUser, userController } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router()

router.get('/testing', userController)
router.post('/update/:id',verifyUser, updateUser)

export default router;