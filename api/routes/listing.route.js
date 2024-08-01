import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import { deleteListing, listing, updateListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyUser, listing)
router.delete('/delete/:id', verifyUser, deleteListing)
router.post('/update/:id', verifyUser, updateListing)

export default router;