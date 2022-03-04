const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate({email: req.user.email}, {address: req.body.address}).exec()
    if (userAddress) {
        res.json({
            success: true
        })
    }
}

exports.authUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).exec()
    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})
