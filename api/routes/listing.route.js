import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import { deleteListing, listing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyUser, listing)
router.delete('/delete/:id', verifyUser, deleteListing)

export default router;