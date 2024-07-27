import Listing from "../models/listing.model.js"

export const listing = async (req, res, next) => {
    try{
        const createListing = await Listing.create(req.body)
    } catch(error) {
        next(error)
    }
}