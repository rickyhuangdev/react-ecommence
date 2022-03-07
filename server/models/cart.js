const mongoose = require("mongoose");

const {Schema} = mongoose

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
            price: Number
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user_id: {
        type: Schema.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model("Cart", cartSchema)
