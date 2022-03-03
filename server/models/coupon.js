const mongoose = require("mongoose");

const {Schema} = mongoose

const couponSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        uppercase: true,
        required: true,
        minlength: [6, "too short"],
        maxlength: [32, "too long"]
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,

    },
    state: {
        type: Number,
        default: 0
    }


}, {timestamps: true})

module.exports = mongoose.model("Coupon", couponSchema)
