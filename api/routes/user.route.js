import express, { Router } from 'express'
import { deleteUser, updateUser, userController } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router()

router.get('/testing', userController)
router.post('/update/:id',verifyUser, updateUser)
router.delete('/delete/:id', verifyUser, deleteUser)

export default router;