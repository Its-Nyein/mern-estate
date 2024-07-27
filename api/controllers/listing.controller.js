import Listing from "../models/listing.model.js"

export const listing = async (req, res, next) => {
    try{
        const createListing = await Listing.create(req.body)
        return res.status(201).json(createListing)
    } catch(error) {
        next(error)
    }
}