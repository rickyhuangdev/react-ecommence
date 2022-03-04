const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken  = require("../utils/generateToken")
const bcrypt = require('bcryptjs')
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
