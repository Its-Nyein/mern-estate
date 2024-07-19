import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const authController = async (req, res, next) => {
    const {username, email, password} = req.body
    const hashPassword =  bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password: hashPassword})
    try {
        await newUser.save()
        res.status(201).json('New user is created!')
    } catch(error) {
        next(errorHandler(550, 'Error from errorHandler'))
    }
}