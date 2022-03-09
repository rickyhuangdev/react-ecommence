const mongoose = require("mongoose");

const {Schema} = mongoose

const WishlistSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: "User"
    },
    product_id: {
        type: Schema.ObjectId,
        ref: "Product"
    }
}, {timestamps: true})

module.exports = mongoose.model("Wishlist", WishlistSchema)
