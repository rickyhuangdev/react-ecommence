const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken  = require("../utils/generateToken")
exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate({email: req.user.email}, {address: req.body.address}).exec()
    if (userAddress) {
        res.json({
            success: true
        })
    }
}

exports.authUser = expressAsyncHandler(async (req, res) => {
    let {email, password} = req.body
    const user = await User.findOne({email}).exec()

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})
exports.getUserProfile = expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }

})
exports.updateUserProfile = expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }

})
exports.registerNewUser = expressAsyncHandler(async (req, res) => {

    let {name, email, password} = req.body
    const userExists = await User.findOne({email}).exec()
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await new User({
        name, email, password
    }).save()
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')

    }

})

exports.getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

})

exports.getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    res.json(user)

})

exports.updateUser = expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }

})

exports.deleteUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findOneAndDelete(req.params.id).exec()

    if(user){
        res.json(user)
    }else {
        res.status(500)
        throw new Error('DB error')
    }

})

