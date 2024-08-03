import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import { deleteListing, getListing, getListings, listing, updateListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyUser, listing)
router.delete('/delete/:id', verifyUser, deleteListing)
router.post('/update/:id', verifyUser, updateListing)
router.get('/getListing/:id', getListing)
router.get('/get', getListings)

export default router;