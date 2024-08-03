import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import User from '../models/user.model.js'
import Listing from '../models/listing.model.js'

export const userController = (req, res) => {
    res.json({
        message: 'API is working well!'
    })
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Unauthorized'))

    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            // $set : req.body // not good practice

            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})
        // add new true to get update user res

        const {password, ...rest} = updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Unauthorized'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json({message: 'User has been deleted'})
    } catch(error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Unauthorized'));

    try {
        const listings = await Listing.find({userRef: req.params.id})
        res.status(200).json(listings)
    } catch(error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
    if(!user) return next(errorHandler(401, 'Unauthorized'))

    const {password: pass, ...rest} = user._doc
    res.status(200).json(rest)
    } catch(error) {
        next(error)
    }
}