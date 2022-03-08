const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    picture: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user'
    },
    address: [
        {
            country: String,
            firstName: String,
            lastName: String,
            companyName: String,
            address: String,
            postCode: String,
            email: String,
            phone: String

        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    state: {
        type: Number,
        default: 1
    },
    wishList: [
        {
            type: ObjectId,
            ref: "Product"
        }
    ]
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


module.exports = mongoose.model('User', userSchema)
