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
        default: 'subscriber'
    },
    cart: {
        type: Array,
        default: []
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
    }
    // wishList: [
    //     {
    //         type: ObjectId,
    //         ref: "Product"
    //     }
    // ]
}, {timestamps: true})

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model('User', userSchema)
