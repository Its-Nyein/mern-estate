import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import { listing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyUser, listing)

export default router;