const User = require('../models/user')
exports.createOrUpdateUser = async (req, res) => {
    const {name, picture, email} = req.user
    const user = await User.findOneAndUpdate({email}, {name, picture})
    if (user) {
        console.log(user)
        res.json(user)
    } else {
        const newUser = await User.create({email, name, picture})
        console.log(newUser)
        res.json(newUser)
    }
    console.log(134)
}

