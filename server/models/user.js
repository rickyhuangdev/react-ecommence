const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const userSchema = new mongoose.Schema({
    name: String,
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
    // wishList: [
    //     {
    //         type: ObjectId,
    //         ref: "Product"
    //     }
    // ]
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
